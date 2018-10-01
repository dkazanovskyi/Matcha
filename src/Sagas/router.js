import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { showNotification } from '../Components/showNotif' 
import * as Api from '../api/Api'

export const sendRoute = function * (action) {
	console.log("ACTION ", action.payload.location.pathname, action.payload.location.pathname.indexOf('/signup/mail_verify'))
	if (action.payload.location.pathname.indexOf('/auth/recovery') !== -1) {
		try {
			const code = action.payload.location.pathname.replace('/auth/recovery/', '')
			const response = yield call(Api.postForm, '/user/recovery', {code: code})
			if (response.status === 200) {
				let msg = "Check"
				let desc = response.data.msg
				showNotification('success', msg, desc, () => {}, 4)
			} else {
				let msg = "Check code error"
				let desc = response.data.error
				showNotification('error', msg, desc, () => {}, 4)
				yield put(push('/'))
			}
		} catch (error){
			let msg = "API error"
			let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
			showNotification('error', msg, desc, () => {}, 4)
			yield put(push('/'))
		}
	}
	else if (action.payload.location.pathname.indexOf('/signup/mail_verify') === -1) {
		console.log("ACTION ACCEPTED")
		const response = yield call(Api.getRoute, action.payload.location.pathname)
		if (response.status === 203){
			if (response.data.user === "auth") {
				let msg = "Access warning"
				let desc = response.data.message
				showNotification('warning', msg, desc, () => {}, 2)
				yield put(push('/'))
			}
			if (response.data.user === "guest") {
				let msg = "Access warning"
				let desc = response.data.message
				showNotification('warning', msg, desc, () => {}, 2)
				yield put(push('/auth/login'))
			}
		}
		console.log("TOTOTOTO", response.data)
	}
}