const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const verifCode = require('../database/models/verifCode')
const nodemailer = require('nodemailer')
const md5 = require('md5')

router.post('/', (req, res) => {
	console.log('user signup')
	console.log("object=============", req.body)
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'anna.nakers@gmail.com',
			pass: 'Passwordbananka1'
		}
	})
	const newUser = new User({
			username: req.body.username,
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
		console.log("Saved:------", savedCode)
	})
	newUser.save((err, savedUser) => {
		if (err) return res.status(203).json(err)
		console.log("Saved:------", savedUser)
		const textMail = 'Press this link: http://localhost:3000/mail_verify?code='+hashMail
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
		console.log('===== CHECK!!======', req.body)
		if (req.body.type === 'username') {
			User.findOne({ username: req.body.value }, (err, user) => {
				if (err) {
						console.log('User.js post error: ', err)
				} else if (user) {
						console.log("==========================", user)
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
						console.log("==========================", user)
						res.status(203).json({
								error: `Sorry, already a user with the email: ${req.body.value}`
						})
				} else {
					res.json({msg: 'Check usename: OK'})
				}
			})
		}
})

module.exports = router