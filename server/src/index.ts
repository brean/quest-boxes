// Colyseus + Express
import express from 'express'
import cors from 'cors'
import { ObjectId, MongoClient } from 'mongodb'

const MONGODB = process.env.mongodb || 'mongodb://localhost'
const PORT = Number(process.env.port) || 3001

const app = express()

app.use(cors())
app.use(express.json())

MongoClient.connect(
  MONGODB,
  {
    useUnifiedTopology: true
  }
).then(client => {
  console.log('Connected to Database')
  const db = client.db('quest-box')
  const questCollection = db.collection('quests')
  app.post('/quest', (req, res) => {
    // create new quest
    const jsonData = req.body
    questCollection.findOne({ name: jsonData.name })
      .then(result => {
        if (result) {
          res.json({ ok: false, msg: 'already_exists' })
        } else {
          questCollection.insertOne(jsonData)
            .then(result => {
              res.json({ ok: true })
            })
        }
      })
  })
  app.get('/quest', (req, res) => {
    // list all quests
    questCollection.find().toArray()
      .then(items => {
        res.json(items)
      })
  })
  app.get('/quest/:qid', (req, res) => {
    // list all quests
    const qid = req.params.qid
    questCollection.findOne({ _id: ObjectId(qid) })
      .then(result => {
        res.json(result)
      })
  })
  app.post('/quest/:qid', (req, res) => {
    // store updated quest data
    const qid = req.params.qid
    questCollection.findOneAndReplace(
      { _id: ObjectId(qid) },
      req.body)
      .then(result => {
        res.json(result)
      })
  })
})

app.listen(PORT)
