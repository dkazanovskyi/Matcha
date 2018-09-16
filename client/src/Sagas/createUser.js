import { call, put } from 'redux-saga/effects'
import { UserTypes } from '../Redux/createUser'

export const createUser = function * (payload) {
  const responce = yield call()
  // if (responce.status === 200) {
  //   yield put(UserTypes.createUserSuccess(responce.data))
  // }
  console.log('SAGA')
}