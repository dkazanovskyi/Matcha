const express = require('express')
const router = express.Router()
const passport = require('../passport')

router.post(
	'/',
	function (req, res, next) {
		passport.authenticate('local', (err, user, info) => {
			if (err) console.log("Login error:", err)
			if (!user) {
				res.status(203)
				res.json(info)
			} else {
				req.login(user, function(err) {
					if (err) { return next(err) }
					console.log("logged in", req.user)
					return res.json(user)
				})
			}
		})(req, res, next)
	}
)

module.exports = router