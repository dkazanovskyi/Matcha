const path = require('ramda').path

const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const verifCode = require('../database/models/verifCode')
const nodemailer = require('nodemailer')
const md5 = require('md5')

router.post('/', (req, res) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'anna.nakers@gmail.com',
			pass: 'Passwordbananka1'
		}
	})
	const newUser = new User({
			username: path(['body', 'username'], req),
			email: req.body.email,
			lastname: req.body.lastname,
			firstname: req.body.firstname,
			password: req.body.password,
			verifStatus: false
	})
	const hashMail = md5(req.body.email + new Date().getTime())
	const newVerifCode = new verifCode({
		username: req.body.username,
		verifCode: hashMail
	})
	newVerifCode.save((err, savedCode) => {
		if (err) return res.status(203).json(err)
	})
	newUser.save((err, savedUser) => {
		if (err) return res.status(203).json(err)
		const textMail = 'Press this link: http://localhost:3000/signup/mail_verify/'+hashMail
		const mailOptions = {
			from: 'no-reply@matcha.com',
			to: `${req.body.email}`,
			subject: `${req.body.username}`,
			text: textMail,
			replyTo: 'no-reply@matcha.com'
		}
		transporter.sendMail(mailOptions, function(err, res) {
			if (err) {
				return res.status(203).json(err)
			} else {
				console.log('here is the res: ', res)
			}
		})
		res.json(savedUser)
	})
})



router.post('/checkExists', (req, res, next) => {
	console.log("TUTT ", req.body.type, path(['body', 'type'], req))
		if (req.body.type === 'username') {
			User.findOne({ username: req.body.value }, (err, user) => {
				if (err) {
						console.log('User.js post error: ', err)
				} else if (user) {
						res.status(203).json({
								error: `Sorry, already a user with the username: ${req.body.value}`
						})
				} else {
					res.json({msg: 'Check usename: OK'})
				}
			})
		} else if (req.body.type === 'email') {
			User.findOne({ email: req.body.value }, (err, user) => {
				if (err) {
						console.log('User.js post error: ', err)
				} else if (user) {
						res.status(203).json({
								error: `Sorry, already a user with the email: ${req.body.value}`
						})
				} else {
					res.json({msg: 'Check usename: OK'})
				}
			})
		}
})

router.post('/mail_verify', (req, res, next) => {
	verifCode.findOne({ verifCode: req.body.code }, (err, note) => {
		if (err) {
				console.log('VerifCode.js post error: ', err)
		} else if (note) {
				const username = note.username
				User.updateOne({ username: username }, { $set: { verifStatus: true }}, function (err, raw) {
					if (err) console.log('VerifCode.js update error: ', err)
				})
				verifCode.deleteOne({ verifCode: req.body.code }, function (err) {
					if (err) console.log('VerifCode.js delete error: ', err)
				})
				res.json({msg: 'Check usename: OK'})
		} else {
			res.status(203).json({
				error: `Sorry, we did not find the user with the code:: ${req.body.code}`
			})
		}
	})
})

module.exports = router