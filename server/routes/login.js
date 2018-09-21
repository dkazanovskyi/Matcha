const express = require('express')
const router = express.Router()
const passport = require('../passport')
const tracer = require('tracer').colorConsole()

router.post(
	'/',
	function (req, res, next) {
		passport.authenticate('local', (err, user, info) => {
			if (err) tracer.error("Login error:", err)
			if (!user) {
				res.status(203)
				res.json(info)
			} else {
				req.login(user, function(err) {
					if (err) {
						tracer.error("Login error:", err)
						return next(err)
					}
					return res.json(user)
				})
			}
		})(req, res, next)
	}
)

module.exports = router