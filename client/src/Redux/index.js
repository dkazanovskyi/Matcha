import { combineReducers } from 'redux'
import { InputReducer } from './inputValidator'

export const reducers = combineReducers({
  input: InputReducer
})
