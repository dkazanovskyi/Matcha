const express = require('express')
const router = express.Router()
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require('fs')
const User = require('../database/models/user')
const tracer = require('tracer').colorConsole()

router.post(
    '/profile',
    upload.single('avatar'),
	function (req, res, next) {
        /** When using the "single"
         data come in "req.file" regardless of the attribute "name". **/
        var tmp_path = req.file.path

        /** The original name of the uploaded file
             stored in the variable "originalname". **/
        var target_path = `uploads/${req.user._id}-profile-${req.file.originalname}`

        /** A better way to copy the uploaded file. **/
        var src = fs.createReadStream(tmp_path)
        var dest = fs.createWriteStream(target_path)
        src.pipe(dest)
        src.on('end', function() {
            User.updateOne({_id: req.user._id}, { $set: { profileImage: target_path }}, function (err, raw) {
                if (err) tracer.error('recovery update error: ', err)
            })
            res.status(200)
            res.json(target_path)
        })
        src.on('error', function(err) { 
            fs.unlink(tmp_path)
            res.status(403)
        })
    }
)

router.post(
    '/photos',
    upload.single('photos'),
	function (req, res, next) {
        /** When using the "single"
         data come in "req.file" regardless of the attribute "name". **/
         var tmp_path = req.file.path

         /** The original name of the uploaded file
              stored in the variable "originalname". **/
         var target_path = `uploads/${req.user._id}-${req.file.originalname}`
 
         /** A better way to copy the uploaded file. **/
         var src = fs.createReadStream(tmp_path)
         var dest = fs.createWriteStream(target_path)
         User.findOne({_id: req.user._id}, (err, foundUser) => {
                if (err) {
                    tracer.error('error upload image: ', err)
                }
                console.log(foundUser)
                
                src.pipe(dest)
                src.on('end', function() {
                    console.log(foundUser.extraImages)
                    User.updateOne({_id: foundUser._id}, { $set: { extraImages: [...foundUser.extraImages.slice(1, Infinity), target_path] }}, function (err, raw) {
                        if (err) tracer.error('recovery update error: ', err)
                    })
                    res.status(200)
                    res.json(target_path)
                })
                src.on('error', function(err) { 
                    fs.unlink(target_path)
                    res.status(400)
                })
            })
	}
)

module.exports = router