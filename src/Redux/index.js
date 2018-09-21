import { combineReducers } from 'redux'
import { UserReducer } from './user'

export const reducers = combineReducers({
  user: UserReducer
})
