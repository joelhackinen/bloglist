import { createSlice } from '@reduxjs/toolkit'
import { setErrorMessage, setSuccessMessage } from './notificationReducer'
import blogService from '../services/blogService'
import loginService from '../services/loginService'
import authService from '../services/authService'
import jwt_decode from 'jwt-decode'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    unsetUser(state, action) {
      return initialState
    }
  }
})

export const { setUser, unsetUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (!loggedUserJSON) {
      return
    }

    const user = JSON.parse(loggedUserJSON)
    try {
      const newUser = await authService.me(user)
      const { token, ...authUser } = newUser
      blogService.setToken(token)
      dispatch(setUser(authUser))
    } catch (e) {
      dispatch(setErrorMessage(`${e.response.data.error}`, 5))
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login({
        username, password,
      })
      const { token, ...authUser } = loggedUser
      blogService.setToken(token)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify({ token })
      )
      dispatch(setUser(authUser))
      dispatch(setSuccessMessage(`welcome, ${username}!`, 5))
    } catch (e) {
      dispatch(setErrorMessage(`${e.response.data.error}`, 5))
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    dispatch(unsetUser())
    dispatch(setSuccessMessage('logged out', 5))
  }
}


export default userSlice.reducer