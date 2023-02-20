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
    },
    appendUserBlog(state, action) {
      const { blog, userId } = action.payload
      return state.map(u => u.id === userId ? { ...u, blogs: [ ...u.blogs, blog ] } : u)
    },
    removeUserBlog(state, action) {
      const { userId, blogId } = action.payload
      return state.map(u => u.id === userId ? { ...u, blogs: u.blogs.filter(b => b.id !== blogId) } : u)
    }
  }
})

export const { setUsers, appendUser, appendUserBlog, removeUserBlog } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}


export default usersSlice.reducer