const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')
const url = require('url')
const app = express()
const PORT = 5000
// Route requires
const user = require('./routes/user')


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
var siteUrls = [
	{pattern:'^/login/?$', user: false}
, {pattern:'^/logout$', user: true}
, {pattern:'^/$', user: false}
, {pattern:'^/users/\\w+/?$', user: true}
, {pattern:'^/signup$', user: false}
, {pattern:'^/profile$', user: true}
, {pattern:'^/chat$', user: true}
, {pattern:'^/search$', user: true}
, {pattern:'^/dating$', user: true}
]

function authorizeUrls(urls) {
	function authorize(req, res, next) {
		var requestedUrl = url.parse(req.url).pathname
		for (var ui in urls) {
			var pattern = urls[ui].pattern
			var restricted = urls[ui].user
			console.log("KUKU", requestedUrl , "===", pattern)
			if (requestedUrl.match(pattern)) {
				console.log("KUKU")
				if (restricted) {
					if (req.session.authorized) {
						// если все хорошо, просто переходим к следующим правилам
						next()
						return
					}
					else{
						// пользователь не авторизирован, отправляем его на страницу логина
						res.writeHead(303, {'Location': '/login'})
						res.end()
						return
					}
				}
				else {
					if (!req.session.authorized) {
						next()
						return
					} else {
						res.writeHead(303, {'Location': '/profile'})
						res.end()
						return
					}
					
				}
			}
		}

		// сюда мы попадаем, только если в цикле не нашлось совпадений
		console.log('common 404 for ', req.url)
		res.end('404: there is no ' + req.url + ' here')
	}
	return authorize 
}

app.use('/', authorizeUrls(siteUrls))
app.use('/user', user)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
