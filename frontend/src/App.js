import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Outlet } from 'react-router-dom'
import Menu from './components/Menu'
import Message from './components/Message'
import LoginForm from './components/LoginForm'


const App = () => {
  console.log('<App />')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [])

  const user = useSelector(state => state.user)

  return (
    <div className="container" style={{ maxWidth: 1080 }}>
      {user === null
        ?
        <div>
          <Message />
          <LoginForm />
        </div>
        :
        <div>
          <Menu />
          <div style={{ padding: '3%' }}>
            <Message />
            <Outlet />
          </div>
        </div>
      }
    </div>
  )
}

export default App