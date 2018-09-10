const express = require('express')
const router = express.Router()
const User = require('../database/models/user')


router.post('/', (req, res) => {
  console.log('user signup')
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