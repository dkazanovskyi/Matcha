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
			res.status(203).end() // redirects you to your profile page
		}

		User.findOne({ username: req.body.recipient }, function (err, person) {
			if (err) return handleError(err);
			if (person) {
				console.log("PERSON", person)
				Chat.find({ $or : [
					{ $and : [ { 'sender' : req.body.recipient }, { 'recipient' : req.user.username } ] },
					{ $and : [ { 'sender' : req.user.username }, { 'recipient' : req.body.recipient } ] }
				]}, function (err, msgArray) {
					if (err) return handleError(err)
					/* for (message in msgArray) {
						messages.push(msgArray[message]);
					} */
					/* res.render('chat.ejs', {
						person   : person,  // profile you are watching now
						user     : user, // logged in user
						liked    : (likes.indexOf(person.local.login) > -1) ? "Unlike" : "Like",
						likedYou : (person.local.likes.indexOf(user.local.login) > -1) ? "True" : "False",
						chats    : messages
					}); */
					tracer.info(msgArray)
					res.json(msgArray)
				});
			}
			else {
				res.status(203).end()  // user not found
			}
		});
	}
)

module.exports = router