import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, error: false }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showError(state, action) {
      return {
        message: action.payload,
        error: true
      }
    },
    showSuccess(state, action) {
      return {
        message: action.payload,
        error: false
      }
    },
    hide(state, action) {
      return initialState
    }
  }
})

export const { showError, showSuccess, hide } = notificationSlice.actions

let timeout = null

const setMessage = (message, seconds, error) => {
  return async dispatch => {
    if (timeout) {
      clearTimeout(timeout)
    }
    error ? dispatch(showError(message)) : dispatch(showSuccess(message))
    timeout = setTimeout(() => {
      dispatch(hide())
    }, seconds * 1000)
  }
}

export const setErrorMessage = (message, seconds) => {
  return dispatch => {
    dispatch(setMessage(message, seconds, true))
  }
}

export const setSuccessMessage = (message, seconds) => {
  return dispatch => {
    dispatch(setMessage(message, seconds, false))
  }
}


export default notificationSlice.reducer