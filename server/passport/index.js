const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../database/models/user')
const tracer = require('tracer').colorConsole()

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	tracer.info('\n*** serializeUser called, user: ./\n', user, '\n---------')
	done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	tracer.info('DeserializeUser called')
	User.findOne(
		{ _id: id },
		'username',
		(err, user) => {
			tracer.info('\n*** Deserialize user, user:\n', user, '\n---------')
			done(null, user)
		}
	)
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport
