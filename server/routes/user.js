const express = require('express')
const router = express.Router()
const tracer = require('tracer').colorConsole()
const User = require('../database/models/user')
const verifCode = require('../database/models/verifCode')
const nodemailer = require('nodemailer')
const md5 = require('md5')
const bcrypt = require('bcryptjs')

router.get('/', (req, res, next) => {
	tracer.info('\n===== user!!======\n', req.user)
	if (req.user) {
			res.json({ user: req.user })
	} else {
			res.json({ user: null })
	}
})

router.get('/logout', (req, res) => {
		console.log("LOGOUT");
		if (req.user) {
				req.logout()
				req.session.destroy()
		res.clearCookie('connect.sid')
				res.json({ msg: 'Logging out' })
		} else {
				res.status(203).json({ msg: 'No user to log out' })
		}
})

router.post('/forgot', (req, res) => {
	let email = ''
	User.findOne({ username: req.body.username }, (err, user) => {
		if (err) {
			tracer.error('User.js post error: ', err)
		} else if (user.verifStatus) {
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'anna.nakers@gmail.com',
					pass: 'Passwordbananka1'
				}
			})
			email = user.email
			const hashMail = md5(email + new Date().getTime())
			const newVerifCode = new verifCode({
				username: req.body.username,
				verifCode: hashMail
			})
			newVerifCode.save((err, savedCode) => {
				if (err) return res.status(203).json(err)
			})
			const textMail = 'Press this link: http://localhost:3000/auth/recovery/'+hashMail
			const mailOptions = {
				from: 'no-reply@matcha.com',
				to: email,
				subject: `Recover password for ${req.body.username}`,
				text: textMail,
				replyTo: 'no-reply@matcha.com'
			}
			transporter.sendMail(mailOptions, function(err, res) {
				if (err) {
					if (err) return res.status(203).json(err)
				}
			})
			res.json({ msg: 'Logging out' })
		} else {
			res.status(203).json({
				msg: `Unverify account: ${req.body.username}`
			})
		}
	})
})

router.post('/recovery', (req, res, next) => {
	verifCode.findOne({ verifCode: req.body.code }, (err, note) => {
		if (err) {
			tracer.error('recovery post error: ', err)
			res.status(203).json({
				error: `Unknown error:: ${req.body.code}`
			})
		} else if (note) {
				res.json({msg: 'Check code: OK'})
		} else {
			res.status(203).json({
				error: `Sorry, we did not find the user with the code:: ${req.body.code}`
			})
		}
	})
})

router.post('/recovery-password', (req, res, next) => {
	verifCode.findOne({ verifCode: req.body.code }, (err, note) => {
		if (err) {
			tracer.error('recovery post error: ', err)
			res.status(203).json({
				error: `Unknown error:: ${req.body.code}`
			})
		} else if (note) {
				const username = note.username
				const password = bcrypt.hashSync(req.body.password, 10)
				User.updateOne({ username: username }, { $set: { password: password }}, function (err, raw) {
					if (err) tracer.error('recovery update error: ', err)
				})
				verifCode.deleteOne({ verifCode: req.body.code }, function (err) {
					if (err) tracer.error('recovery delete error: ', err)
				})
				res.json({msg: 'Change pass status: OK'})
		} else {
			res.status(203).json({
				error: `Sorry, we did not find the user with the code:: ${req.body.code}`
			})
		}
	})
})

module.exports = router