import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	createUserSuccess: ['payload'],
	createUserRequest: ['payload', 'actionSuccess', 'actionFail'],
	createUserFailure: null,
	registerUserRequest: ['payload', 'actionSuccess', 'actionFail'],
	verifyCodeRequest: ['payload', 'actionRedirect'],
	logoutRequest: null,
	forgotUserRequest: ['payload', 'actionSuccess', 'actionFail'],
	recoveryUserRequest: ['payload', 'actionSuccess', 'actionFail'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	data: {
		username: ''
	},
	authorize: false
})

/* ------------- Reducers ------------- */

export const createUserSuccess = (state, action) => {
	return state.merge({
		data: action.payload,
		authorize: true
	})
}

export const createUserRequest = (state, action) => {
	return state.merge({isFetching: true})
}

export const createUserFailure = (state, action) => {
	return state.merge({isFetching: false})
}

/* ------------- Hookup Reducers To Types ------------- */

export const UserReducer = createReducer(INITIAL_STATE, {
	[Types.CREATE_USER_SUCCESS]: createUserSuccess,
	[Types.CREATE_USER_REQUEST]: createUserRequest,
	[Types.CREATE_USER_FAILURE]: createUserFailure,
})