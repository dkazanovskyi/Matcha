import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    createUserSuccess: ['payload'],
    createUserRequest: ['payload']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    
  })

/* ------------- Reducers ------------- */

export const createUserSuccess = (state, action) => {
    return state.merge({requestInProgress: false, user: action.payload})
}

export const createUserRequest = (state, action) => {
    return state.merge({requestInProgress: true})
}


/* ------------- Hookup Reducers To Types ------------- */

export const UserReducer = createReducer(INITIAL_STATE, {
    [Types.CREATE_USER_SUCCESS]: createUserSuccess,
    [Types.CREATE_USER_REQUEST]: createUserRequest
})