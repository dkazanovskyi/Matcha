import { call, put } from 'redux-saga/effects'
import UserTypes from '../Redux/user'
import { showNotification } from '../Components/showNotif'
import { push } from 'connected-react-router'
import * as Api from '../api/Api'

export const createUser = function * (action) {
	try {
		console.log("Login", action.payload)
		const response = yield call(Api.postForm, '/login/', action.payload)
		if (response.status === 200) {
			let msg = "Success authorize"
			let desc = 'Have fun'
			showNotification('success', msg, desc, action.actionSuccess, 2)
			yield put(UserTypes.createUserSuccess(response.data))
		}
		else {
			let msg = response.data.message
			let desc = 'An attempt to contact the database resulted in an error. Try again.\n'
			showNotification('error', msg, desc, action.actionFail, 2)
			yield put(UserTypes.createUserFailure())
		}
	} catch (error){
		let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, action.actionFail, 2)
		yield put(UserTypes.createUserFailure())
	}
}

export const registerUser = function * (action) {
	console.log("YOBA BOBA");
	try {
		const response = yield call(Api.postForm, '/signup/', action.payload)
		if (response.status === 200) {
			let msg = "Success registration"
			let desc = 'Letter confirmation email has been sent. After 3 seconds you will be redirected to the main page.'
			showNotification('success', msg, desc, action.actionSuccess, 3)
		}
		else {
			let msg = "Fetch error"
			let desc = 'An attempt to contact the database resulted in an error. Try again.\n'+response.data.error
			showNotification('error', msg, desc, action.actionFail, 2)
		}
	} catch (error){
		let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, action.actionFail, 2)
	}
}

export const verifyCode = function * (action) {
	try {
		const response = yield call(Api.postForm, '/signup/mail_verify', action.payload)
		if (response.status === 200) {
			let msg = "Success verify"
			let desc = 'Now you can log in with your username and password.'
			showNotification('success', msg, desc, () => {}, 4)
			action.actionRedirect()
		} else {
			let msg = "Verify error"
			let desc = response.data.error
			showNotification('error', msg, desc, action.actionRedirect, 4)
		}
	} catch (error){
		let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, action.actionRedirect, 4)
	}
}

export const logout = function * () {
	console.log("LOGOUT");
	try {
		const response = yield call(Api.getRoute, '/user/logout')
		if (response.status === 200) {
			let msg = "Success logout"
			let desc = 'Now you can log in with your username and password.'
			showNotification('success', msg, desc, () => {}, 4)
			window.location.reload()
		} else {
			let msg = "Logout error"
			let desc = response.data.error
			showNotification('error', msg, desc, () => {}, 4)
		}
	} catch (error){
		let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, () => {}, 4)
	}
}