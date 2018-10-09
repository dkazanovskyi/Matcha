import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	fetchChatSuccess: ['payload'],
	fetchChatRequest: ['payload', 'initMessageHistory'],
	fetchChatFailure: null,
})

export const ChatTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	messages: [],
	isFetching: false
})

/* ------------- Reducers ------------- */

export const fetchChatSuccess = (state, action) => {
	console.log("SUCCESS")
	return state.merge({
		messages: action.payload,
		isFetching: false
	})
}

export const fetchChatRequest = (state, action) => {
	console.log("request")
	return state.merge({isFetching: true})
}

export const fetchChatFailure = (state, action) => {
	console.log("FAIL")
	return state.merge({isFetching: false})
}

/* ------------- Hookup Reducers To Types ------------- */

export const ChatReducer = createReducer(INITIAL_STATE, {
	[Types.FETCH_CHAT_SUCCESS]: fetchChatSuccess,
	[Types.FETCH_CHAT_REQUEST]: fetchChatRequest,
	[Types.FETCH_CHAT_FAILURE]: fetchChatFailure,
})