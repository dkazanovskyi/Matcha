const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')
const tracer = require('tracer').colorConsole()
const socket = require('socket.io')
const indexSockets = require('./sockets/index')
const app = express()
const path = require('path')
const PORT = 5000
// Route requires


// MIDDLEWARE
app.use(morgan('dev'))

app.use(
	bodyParser.urlencoded({
		parameterLimit: 100000,
    limit: '50mb',
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'chlenosos', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
require('./routes/index')(app)

// Starting Server 
const server = app.listen(PORT, () => {
	tracer.info(`App listening on PORT: ${PORT}`)
})

app.get("/uploads/:id", (req, res) => {
	console.log('route uploads')
  res.sendFile(path.join(__dirname, "./uploads/"))
})

io = socket(server);

io.on('connection', (socket) => {
	indexSockets(socket)
});
