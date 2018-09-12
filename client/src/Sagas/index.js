import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { ValidationTypes } from '../Redux/inputValidator'

/* ------------- Sagas ------------- */

import { validateInput } from './validationSaga'

export default function * root () {
    yield all([
      takeLatest(ValidationTypes.VALIDATE_INPUT_REQUEST, validateInput)
    ])
}  