import { call, put } from 'redux-saga/effects'
import ChatTypes from '../Redux/chat'
import { showNotification } from '../Components/showNotif'
import * as Api from '../api/Api'

export const fecthChat = function * (action) {
	try {
		const response = yield call(Api.postForm, '/chat/', action.payload)
		if (response.status === 200) {
			console.log("Success fetch")
			action.initMessageHistory(response.data)
			yield put(ChatTypes.fetchChatSuccess(response.data))
		}
		else {
			let msg = "response.data.message"
			let desc = 'An attempt to contact the database resulted in an error. Try again.\n'
			showNotification('error', msg, desc, ()=>{}, 2)
			yield put(ChatTypes.fetchChatFailure())
		}
	} catch (error){
		let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, ()=>{}, 2)
		yield put(ChatTypes.fetchChatFailure())
	}
}