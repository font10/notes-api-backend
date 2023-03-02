require('dotenv').config()
require('./mongo')

const cors = require('cors')
const express = require('express')
const app = express()
const Note = require('./models/Note')

app.use(cors())
//? Body-parser
app.use(express.json())
//const http = require('http')
//import http from 'http'  - Tambe funcionaria

/*const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})*/

let notes = []

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => { 
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const note = notes.find(note => note.id === id);
  if (note) response.json(note)
  else response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
  const id = parseInt(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app