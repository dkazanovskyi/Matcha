const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('user signup')

    // ADD VALIDATION
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
          console.log('User.js post error: ', err)
      } else if (user) {
          console.log("==========================", user)
          res.status(203).json({
              error: `Sorry, already a user with the username: ${req.body.username}`
          })
      }
      else User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          console.log('User.js post error: ', err)
        } else if (user) {
          console.log("==========================", user)
          res.status(203).json({
              error: `Sorry, already a user with the email: ${req.body.email}`
          })
        }
        else {
          console.log("object=============", req.body)
          const newUser = new User({
              username: req.body.username,
              email: req.body.email,
              lastname: req.body.lastname,
              firstname: req.body.firstname,
              password: req.body.password
          })
          newUser.save((err, savedUser) => {
            if (err) return res.status(203).json(err)
            console.log("Saved:------", savedUser)
            res.json(savedUser)
          })
        }
      })
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ')
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user)
        var userInfo = {
            username: req.user.username
        }
        res.send(userInfo)
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
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