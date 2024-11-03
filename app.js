import cors from "cors";
import db from "./connection.js"
import { ObjectId } from "mongodb";
import express from "express";
import 'dotenv/config'

import bodyParser from 'body-parser'
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  let collection = await db.collection("posts");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
  // res.send('Hello World, programmed to work but not to feel')
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

app.listen(port, '::', () => {
  console.log(`Example app listening on port ${port}`)
})