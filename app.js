import cors from "cors";
import db from "./connection.js"
import { ObjectId } from "mongodb";
import express from "express";
import 'dotenv/config'

const app = express()
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  let collection = await db.collection("posts");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
  // res.send('Hello World, programmed to work but not to feel')
})

app.get('/all', async (req, res) => {
  let collection = await db.collection("posts");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
  // res.send('Hello World, programmed to work but not to feel')
})

app.listen(port, '::', () => {
  console.log(`Example app listening on port ${port}`)
})