const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')
const tracer = require('tracer').colorConsole()
const socket = require('socket.io')
const app = express()
const PORT = 5000
// Route requires


// MIDDLEWARE
app.use(morgan('dev'))

app.use(
	bodyParser.urlencoded({
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

io = socket(server);

io.on('connection', (socket) => {
	console.log("Hello socket", socket.id);
	socket.on('chat message', function(msg){
		console.log("MESSSSAGE", msg)
		socket.emit('your message', msg);
		socket.broadcast.emit('chat message', msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});
