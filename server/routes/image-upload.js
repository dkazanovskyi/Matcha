const express = require('express')
const router = express.Router()
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require('fs')

router.post(
    '/profile',
    upload.single('avatar'),
	function (req, res, next) {
        /** When using the "single"
         data come in "req.file" regardless of the attribute "name". **/
        var tmp_path = req.file.path

        /** The original name of the uploaded file
             stored in the variable "originalname". **/
        var target_path = 'uploads/' + req.file.originalname //TODO: add atributes according to current user

        console.log(req)
        /** A better way to copy the uploaded file. **/
        var src = fs.createReadStream(tmp_path)
        var dest = fs.createWriteStream(target_path)
        src.pipe(dest)
        src.on('end', function() {
            res.status(200)
            res.json(target_path)
        })
        src.on('error', function(err) { res.status(400) })
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
         var target_path = 'uploads/' + req.file.originalname //TODO: add atributes according to current user
 
         /** A better way to copy the uploaded file. **/
         var src = fs.createReadStream(tmp_path)
         var dest = fs.createWriteStream(target_path)
         src.pipe(dest)
         src.on('end', function() {
             res.status(200)
             res.json(target_path)
         })
         src.on('error', function(err) { res.status(400) })
	}
)

module.exports = router