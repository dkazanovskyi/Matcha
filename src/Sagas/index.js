import { all, takeEvery } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { UserTypes } from '../Redux/user'
import { ChatTypes } from '../Redux/chat'

/* ------------- Sagas ------------- */

import { createUser, registerUser, verifyCode, logout, forgotUser, recoveryUser } from './user'
import { sendRoute } from './router'
import { fecthChat } from './chat'

export default function * root () {
	yield all([
		takeEvery('@@router/LOCATION_CHANGE', sendRoute),
		takeEvery(UserTypes.CREATE_USER_REQUEST, createUser),
		takeEvery(UserTypes.REGISTER_USER_REQUEST, registerUser),
		takeEvery(UserTypes.VERIFY_CODE_REQUEST, verifyCode),
		takeEvery(UserTypes.LOGOUT_REQUEST, logout),
		takeEvery(UserTypes.FORGOT_USER_REQUEST, forgotUser),
		takeEvery(UserTypes.RECOVERY_USER_REQUEST, recoveryUser),
		takeEvery(ChatTypes.FETCH_CHAT_REQUEST, fecthChat),
	])
}