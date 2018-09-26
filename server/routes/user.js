const express = require('express')
const router = express.Router()
const tracer = require('tracer').colorConsole()

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

module.exports = router