import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";
import { randomUUID } from 'crypto';

const client = new S3Client({
  credentials: fromEnv(),
  endpoint: "https://fd0314cb84aca3240521990fc2bb803c.r2.cloudflarestorage.com"
});

export default defineEventHandler(async (event) => {
  const form = await readFormData(event)
  console.log('Form', form)
  const file = form.get('file') as File
  
  const file_name = randomUUID().toString() + `-${file.name}`

  if (!file || !file.size) {
    throw createError({ statusCode: 400, message: 'No file provided' })
  }

  const command = new PutObjectCommand({
    Bucket: "poro",
    Key: file_name,
    Body: await file.arrayBuffer(),
  });

  try {
    const response = await client.send(command);
    console.log('Success file upload', response);
  } catch (err) {
    console.error('Error file upload', err);
  }

  // ensureBlob(file, { maxSize: '1MB', types: ['image'] })
  // return hubBlob().put(`images/${file.name}`, file, { addRandomSuffix: false })
  return {
    'name': file_name,
    'size': file.size,
    'url': `https://pub-b62914ea73f14287b50eae850c46299b.r2.dev/${file_name}`,
  }
})