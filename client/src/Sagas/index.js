import { takeLatest, all, takeEvery } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { ValidationTypes } from '../Redux/inputValidator'
import { UserTypes } from '../Redux/createUser'

/* ------------- Sagas ------------- */

import { validateInput } from './validationSaga'
import { createUser } from './createUser'

export default function * root () {
	yield all([
		takeEvery('@@router/LOCATION_CHANGE', () => console.log('location changed')),
		takeLatest(ValidationTypes.VALIDATE_INPUT_REQUEST, validateInput),
		takeEvery(UserTypes.CREATE_USER_REQUEST, createUser),
	])
}