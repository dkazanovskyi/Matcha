const express = require('express')
const router = express.Router()
const passport = require('../passport')

router.post(
	'/',
	function (req, res, next) {
		passport.authenticate('local', (err, user, info) => {
			console.log('logged in', user)
			if (err) console.log("Login error:", err)
			let result = {}
			if (!user) {
				result = info
				res.status(203)
			} else {
				result = {
					username: user.username
				}
			}
			res.json(result)
		})(req, res, next)
	}
)

module.exports = router