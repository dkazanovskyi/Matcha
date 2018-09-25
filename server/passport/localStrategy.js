const User = require('../database/models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		console.log('Passport 1');
		User.findOne({ username: username }, (err, user) => {
			console.log('Passport 2');
			if (err) {
				return done(err)
			}
			
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			if (!user.checkVerify()) {
				return done(null, false, { message: 'Unverify account' })
			}
			return done(null, user)
		})
	}
)

module.exports = strategy
