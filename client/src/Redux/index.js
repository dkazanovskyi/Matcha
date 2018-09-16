import { combineReducers } from 'redux'
import { InputReducer } from './inputValidator'
import { UserReducer } from './createUser'

export const reducers = combineReducers({
  input: InputReducer,
  user: UserReducer
})
