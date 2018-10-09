import { combineReducers } from 'redux'
import { UserReducer } from './user'
import { ChatReducer } from './chat'

export const reducers = combineReducers({
  user: UserReducer,
  chat: ChatReducer
})
