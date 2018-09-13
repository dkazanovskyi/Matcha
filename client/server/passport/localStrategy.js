const User = require('../database/models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		console.log("USERNAME", username)
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err)
			}
			console.log("USER", user)
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			console.log("DAAAAAAROVA+===222")
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			console.log("DAAAAAAROVA+===122")
			if (!user.checkVerify()) {
				return done(null, false, { message: 'Unverify account' })
			}
			console.log("DAAAAAAROVA+===")
			return done(null, user)
		})
	}
)

module.exports = strategy
