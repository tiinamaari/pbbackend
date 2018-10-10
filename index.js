const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('data', function getData(req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

const Person = require('./models/person')

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

/*
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
*/
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(formatPerson))
    })
})

app.get('/info', (req, res) => {
  const today = new Date()
  Person
    .find({})
    .then(persons => {
      res.send(
        `<p>Puhelinluettelossa on ${persons.length} henkilön tiedot<br/>
          ${today}
        <p>`
      )
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person){
        response.json(formatPerson(person))
      }
      else{
        response.status(404).end()
      }
      
    })
    .catch(error => {
      console.log('Henkilöä ei löytynyt.', error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response) => {

  Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      console.log('poistettu', result)
      response.status(204).end()
    })
    .catch(error => {
      console.log('Henkilöä ei voitu poistaa, koska häntä ei löytynyt.', error)
      response.status(400).send({ error: 'malformatted id' })
    })
    
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (body.name === '') {
    return response.status(400).json({error: 'name missing'})
  } 
  if(body.number === ''){
    return response.status(400).json({error: 'number missing'})
  }

  const person = new Person ({
      name: body.name,
      number: body.number,
  })

  Person
    .find({name: person.name})
    .then(result => {
      console.log(result)
      if(result.length > 0){
        console.log('Henkilö on jo luettelossa.')
        response.status(400).json({error: 'name already on phonebook'})
      }
      else{
        person
          .save()
          .then(savedPerson => {
            response.json(formatPerson(savedPerson))
          })
      }
    }) 
})

const generateId = () => {
  return Math.trunc(Math.random() * 10000000000)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.put('/api/persons/:id', (request, response) => {
  console.log('updatetaan')
  const person = {
    name: request.body.name,
    number: request.body.number,
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updatedPerson => {
      response.json(formatPerson(updatedPerson))
      console.log(updatedPerson)
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
    
})
