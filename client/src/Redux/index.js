import { combineReducers } from 'redux'
import { InputReducer } from './inputValidator'
import { UserReducer } from './user'

export const reducers = combineReducers({
  input: InputReducer,
  user: UserReducer
})
