import { call, put } from 'redux-saga/effects'
import UserTypes from '../Redux/user'
import { showNotification } from '../Components/showNotif'
import Api from '../api/Api'

export const createUser = function * (action) {
	try {
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