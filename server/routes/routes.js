const express = require('express')
const router = express.Router()
const tracer = require('tracer').colorConsole()

const guestRoutes = [
  '/auth/register',
  '/auth/login',
  ]

const authRoutes = [
  '/profile/',
  '/user/logout'
  ]

const allRoutes = [
  '/user/',
  '/'
  ]

const workRoutes = [
  '/user/logout'
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
    else if (authRoutes.find((element) => {
      return element === req.url
    })){
      console.log("AUTH", req.user);
      if (!req.user){
        res.status(203).json({user: 'guest', message: 'Log in to view this page'})
        res.end()
      }
      else {
        if (workRoutes.find((element) => {
          return element === req.url
        })) { console.log("WORK")
          next()}
        else res.end()
      }
    }
    else if (allRoutes.find((element) => {
      return element === req.url
    })){
      console.log("ALL");
      next()
    }
    else {console.log("OTHER");
      res.status(204).end()}
  }
  else next()
});

module.exports = router