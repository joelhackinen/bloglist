import { useSelector, useDispatch } from 'react-redux'
import { addLike, deleteBlog, addComment } from '../reducers/blogsReducer'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Badge } from 'react-bootstrap'
import CommentForm from './CommentForm'


const BlogPage = ({ blog }) => {
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const { id, title, author, url, user, likes, comments } = blog

  const handleDelete = () => {
    if (window.confirm(`Remove ${title} by ${author}?`)) {
      dispatch(deleteBlog(id))
      navigate('/')
    }
  }

  const handleLike = () => {
    dispatch(addLike(blog))
  }

  const handleComment = (comment) => {
    dispatch(addComment(blog, comment))
  }

  return (
    <div>
      <h3>
        <span style={{ marginRight: 10 }}>{title} by {author}</span>
        <Button onClick={handleLike} size="sm">
          Likes <Badge bg="secondary">{likes}</Badge>
        </Button>
      </h3>
      <div>
        <a href={`//${url}`}>{url}</a>
      </div>
      <div>
        added by <Link to={`/users/${user.id}`}>{user.name}</Link>
      </div>
      <div>
        {user.id === currentUser.id
          ? <Button variant="warning" id="remove-button" onClick={handleDelete}>remove</Button>
          : null
        }
      </div>
      <div style={ { marginTop: 20 } }>
        <CommentForm commentHandler={handleComment} />
        <div style={ { marginTop: 20 } }>
          <h5>Comments</h5>
          <ul>
            {comments.map((c, i) =>
              <li key={i}>{c}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BlogPage