import { useSelector } from 'react-redux'
import { Link, Outlet, useParams } from 'react-router-dom'


const User = () => {
  const { id: userId } = useParams()
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === userId)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h5>added blogs</h5>
      <div>
        {user.blogs.map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  )
}


export default User