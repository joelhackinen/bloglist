import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendUser(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const { setUsers, appendUser } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}


export default usersSlice.reducer