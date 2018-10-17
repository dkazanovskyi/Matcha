const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({

	email: { type: String, unique: false, required: false },
	username: { type: String, unique: false, required: false },
	lastname: { type: String, unique: false, required: false },
	firstname: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false },
	verifStatus: {type: Boolean, unique: false, required: false},
	

})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	checkVerify: function () {
		return this.verifStatus
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User