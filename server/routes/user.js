const express = require('express')
const router = express.Router()
const tracer = require('tracer').colorConsole()

router.get('/', (req, res, next) => {
  tracer.debug('\n===== user!!======\n', req.user)
  if (req.user) {
      res.json({ user: req.user })
  } else {
      res.json({ user: null })
  }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router