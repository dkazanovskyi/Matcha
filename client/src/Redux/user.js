import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    createUserSuccess: ['payload'],
    createUserRequest: ['payload'],
    createUserFailure: null,
    registerUserRequest: ['payload', 'actionSuccess', 'actionFail'],
    registerUserEnd: null,
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    isFetching: false,
    authorizedUser: {
        data: {},
        authorize: false
    }
  })

/* ------------- Reducers ------------- */

export const createUserSuccess = (state, action) => {
    return state.merge({isFetching: false, user: action.payload})
}

export const createUserRequest = (state, action) => {
    return state.merge({isFetching: true})
}

export const registerUserRequest = (state, action) => {
    return state.merge({isFetching: true})
}

export const registerUserEnd = (state, action) => {
    return state.merge({isFetching: false})
}

/* ------------- Hookup Reducers To Types ------------- */

export const UserReducer = createReducer(INITIAL_STATE, {
    [Types.CREATE_USER_SUCCESS]: createUserSuccess,
    [Types.CREATE_USER_REQUEST]: createUserRequest
})