import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <Table striped>
        <tbody>
          <tr>
            <th><strong>username</strong></th>
            <th><strong>blogs created</strong></th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}


export default Users