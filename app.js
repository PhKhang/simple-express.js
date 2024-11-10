import cors from "cors";
import db from "./connection.js"
import { ObjectId } from "mongodb";
import express from "express";
import 'dotenv/config'
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from 'multer-s3'

import bodyParser from 'body-parser'
import multer from 'multer';
import { fromEnv } from "@aws-sdk/credential-providers";

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  // let collection = await db.collection("posts");
  // let results = await collection.find({}).toArray();
  // res.send(results).status(200);
  res.send('Hello World, programmed to work but not to feel')
})

app.get('/all', async (req, res) => {
  let posts = await db.collection("posts");
  let results = await posts.find({}).toArray();
  res.send(results).status(200);
  // res.send('Hello World, programmed to work but not to feel')
})

app.post('/add', async (req, res) => {
  let posts = await db.collection("posts");
  console.log("Post content: ", req.body.content)
  const post = req.body
  let result = await posts.insertOne(post);
  console.log(`A document was inserted with the _id: ${result.insertedId}`)
  res.send(result).status(200);
})

const s3 = new S3Client({
  credentials: fromEnv(),
  endpoint: "https://fd0314cb84aca3240521990fc2bb803c.r2.cloudflarestorage.com"
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'flow',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send({ filename: req.file.filename, path: req.file.path });
});

app.listen(port, '::', () => {
  console.log(`Example app listening on port ${port}`)
})