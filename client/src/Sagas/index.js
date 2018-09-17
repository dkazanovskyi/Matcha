import { all, takeEvery } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { UserTypes } from '../Redux/user'

/* ------------- Sagas ------------- */

import { createUser, registerUser } from './user'

export default function * root () {
	yield all([
		takeEvery('@@router/LOCATION_CHANGE', () => console.log('location changed')),
		takeEvery(UserTypes.CREATE_USER_REQUEST, createUser),
		takeEvery(UserTypes.REGISTER_USER_REQUEST, registerUser),
	])
}