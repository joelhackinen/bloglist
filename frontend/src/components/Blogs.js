import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ListGroup, Button } from 'react-bootstrap'

const Blogs = ({ toggleForm }) => {
  const navigate = useNavigate()
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h4>blogs <Button variant="success" onClick={toggleForm}>add new</Button></h4>
      <ListGroup>
        {sortedBlogs.map(({ id, author, title }) =>
          <ListGroup.Item key={id} action onClick={() => navigate(`/blogs/${id}`)}>
            {title} by {author}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default Blogs