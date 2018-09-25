import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { showNotification } from '../Components/showNotif' 
import * as Api from '../api/Api'

export const sendRoute = function * (action) {
	console.log("ACTION ", action.payload.location.pathname, action.payload.location.pathname.indexOf('/signup/mail_verify'))
	if (action.payload.location.pathname.indexOf('/signup/mail_verify') === -1) {
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