import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Home from './components/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'blogs/:id',
        element: <Blog />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'users/:id',
        element: <User />,
      },
    ],
  },
])

export default router