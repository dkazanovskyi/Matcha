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
/* router.post(
	'/',
	function (req, res, next) {
			console.log('routes/user.js, login, req.body: ')
			console.log(req.body)
			next()
	},
	passport.authenticate('local'),
	(req, res) => {
			console.log('logged in', req)
			console.log("================================")
			var userInfo = {
					username: req.user.username
			}
			res.send(userInfo)
	}
) */

module.exports = router