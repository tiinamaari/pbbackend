const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

morgan.token('data', function getData(req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  },
  {
    name: "Jorma Kemppainen",
    number: "5498479356",
    id: 5
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const today = new Date()
  res.send(
    `<p>Puhelinluettelossa on ${persons.length} henkilön tiedot<br/>
      ${today}
    <p>`
  )

})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id )

  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  personNames = persons.map(person => person.name)
  if (body.name === undefined) {
    return response.status(400).json({error: 'name missing'})
  }
  else if(body.number === undefined){
    return response.status(400).json({error: 'number missing'})
  }
  else if(personNames.includes(body.name)){
    return response.status(400).json({error: 'name already exist on phonebook'})
  }

  const person = {
      name: body.name,
      number: body.number,
      id: generateId()
  }

  persons= persons.concat(person)

  response.json(person)
})

const generateId = () => {
  return Math.trunc(Math.random() * 10000000000)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
