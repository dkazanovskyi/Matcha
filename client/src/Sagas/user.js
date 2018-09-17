import { call, put } from 'redux-saga/effects'
import UserTypes from '../Redux/user'
import { showNotification } from '../Components/showNotif'
import Api from '../api/Api'

export const createUser = function * (payload) {
  const responce = yield call(Api.postForm('EWR', payload))
  if (responce.status === 200) {
    console.log(UserTypes)
    yield put(UserTypes.createUserSuccess(responce.data))
  }
  console.log('SAGA')
}

export const registerUser = function * (action, actionSuccess, actionFail) {
  console.log("SAGA", Api, actionFail)
  try {
    const response = yield call(Api.postForm, '/signup/', action.payload)
    if (response.status === 200) {
      let msg = "Success registration"
      let desc = 'Letter confirmation email has been sent. After 3 seconds you will be redirected to the main page.'
      showNotification('success', msg, desc, actionSuccess, 3)
    }
    else {
      let msg = "Fetch error"
      let desc = 'An attempt to contact the database resulted in an error. Try again.\n'+response.data.error
      showNotification('error', msg, desc, actionFail, 2)
    }
    yield put(UserTypes.registerUserEnd)
  } catch (error){
    let msg = "API error"
		let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
		showNotification('error', msg, desc, actionFail, 2)
    yield put(UserTypes.registerUserEnd)
  }
  
  console.log('SAGA')
}