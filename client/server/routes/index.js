
module.exports = (app) => {
  app.use('/user', require('./user'))
  app.use('/signup', require('./signup'))
}