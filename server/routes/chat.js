const express = require('express')
const router = express.Router()
const tracer = require('tracer').colorConsole()
const User = require('../database/models/user')
const Chat = require('../database/models/chat')

router.post(
	'/',
	function (req, res, next) {
		console.log("CHAT RESPONSE", req.body)
		if (req.user.username === req.body.recipient) {
			res.status(203).end()
		}
		User.findOne({ username: req.body.recipient }, function (err, person) {
			if (err) return handleError(err);
			if (person) {
				Chat.find({ $or : [
					{ $and : [ { 'sender' : req.body.recipient }, { 'recipient' : req.user.username } ] },
					{ $and : [ { 'sender' : req.user.username }, { 'recipient' : req.body.recipient } ] }
				]}, function (err, msgArray) {
					if (err) return handleError(err)
					tracer.info(msgArray)
					res.json(msgArray)
				})
			}
			else {
				res.status(203).end()
			}
		})
	}
)

router.post(
	'/message',
	function (req, res, next) {
		console.log("MSG RESPONSE", req.body, req.user)
		if (req.user.username === req.body.recipient) {
			console.log("DSASASAS")
			res.status(203).end()
		}
		const newMessage = new Chat({
			sender: req.user.username,
			recipient: req.body.recipient,
			message: req.body.msg
		})
		newMessage.save(function(err) {
			if (err) {
				return res.status(203).json(err)
			}
			res.json({msg: "zbs"})
		})
	}
)

module.exports = router