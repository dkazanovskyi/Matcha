const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const tracer = require('tracer').colorConsole()

//your local database url
//27017 is the default mongoDB port
const uri = 'mongodb://localhost:27017/matcha' 
mongoose.set('useFindAndModify', false)

mongoose.connect(uri, {useNewUrlParser: true }).then(
  () => {
    tracer.trace('Connected to Mongo')
  },
  err => {
    tracer.error('\nerror connecting to Mongo: \n', err)
  }
)


module.exports = mongoose.connection