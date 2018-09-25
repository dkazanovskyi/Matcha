
module.exports = (app) => {
  app.use('/', require('./routes'))
  app.use('/user', require('./user'))
  app.use('/signup', require('./signup'))
  app.use('/login', require('./login'))
}