import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    validateInputRequest: ['payload'],
    validateInput: null
})
  
export const ValidationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    inputValue: ''
  })

/* ------------- Reducers ------------- */

export const validateInput = (state, action) => {
    return state.merge({inputValue: 'asd'})
}

/* ------------- Hookup Reducers To Types ------------- */

export const InputReducer = createReducer(INITIAL_STATE, {
    [Types.VALIDATE_INPUT]: validateInput
})
