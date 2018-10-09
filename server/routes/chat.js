const express = require('express')
const router = express.Router()
const tracer = require('tracer').colorConsole()

router.post(
	'/',
	function (req, res, next) {
        console.log("CHAT RESPONSE", req.body)
        res.status(203).end()
	}
)

module.exports = router