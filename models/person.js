const mongoose = require('mongoose')

const url = 'mongodb://<username>:<password>@ds231315.mlab.com:31315/amazingphonebook'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person
