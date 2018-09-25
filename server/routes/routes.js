const express = require('express')
const router = express.Router()
const tracer = require('tracer').colorConsole()

const guestRoutes = [
  '/auth/register',
  '/auth/login',
  ]

const authRoutes = [
  '/profile/',
  ]

const allRoutes = [
  '/user/',
  '/'
  ]

router.use(function timeLog(req, res, next) {
  tracer.debug('Time: ', req.url, '-----', req.method)
  if (req.method == 'GET'){
    console.log("GET req");
    if (guestRoutes.find((element) => {
      return element === req.url
    })){
      console.log("GUEST", req.user);
      if (req.user){
        res.status(203).json({user: 'auth', message: 'You do not have permissions to access this page.'})
        res.end()
      }
      else res.end()
    }
    if (authRoutes.find((element) => {
      return element === req.url
    })){
      console.log("AUTH", req.user);
      if (!req.user){
        res.status(203).json({user: 'guest', message: 'Log in to view this page'})
        res.end()
      }
      else res.end()
    }
    if (allRoutes.find((element) => {
      return element === req.url
    })){
      console.log("ALL");
      next()
    }
  }
  next()
});

module.exports = router