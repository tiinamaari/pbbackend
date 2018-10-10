const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://tinde:passu123@ds231315.mlab.com:31315/amazingphonebook'
let newName = ''
let newNumber = ''

mongoose.connect(url)


process.argv.forEach((val, index) => {
  if (index === 2){
    newName = val
  }
  else if (index === 3) {
    newNumber = val
  }

});

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const person = new Person({
  name: newName,
  number: newNumber
})

if (newName !== ''){
  console.log(`Lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
  person
  .save()
  .then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
else{
  
  Person
  .find({})
  .then(result => {
    console.log('Puhelinluettelo:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
