import { useField } from '../hooks'
import { forwardRef } from 'react'
import { createBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Togglable from './Togglable'

const BlogForm = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const { id, name, username } = useSelector(state => state.user)

  const { reset: resetTitle, ...title } = useField('title', 'text')
  const { reset: resetAuthor, ...author } = useField('author', 'text')
  const { reset: resetUrl, ...url } = useField('url', 'text')

  const handleCreate = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
      user: {
        id,
        name,
        username
      }
    }))
    props.toggleForm()
    resetFields()
  }

  const resetFields = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const style = {
    marginBottom: 5
  }

  return (
    <Togglable placement="end" titleText="Add a new blog" ref={ref}>
      <div className="formDiv">
        <Form onSubmit={handleCreate}>
          <Form.Group>
            <div style={style}>
              <Form.Control
                placeholder="title here"
                { ...title }
              />
            </div>
            <div style={style}>
              <Form.Control
                placeholder="author here"
                { ...author }
              />
            </div>
            <div style={style}>
              <Form.Control
                placeholder="url here"
                { ...url }
              />
            </div>
            <Button variant="success" id="create-button" type="submit">
              add
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Togglable>
  )
})

BlogForm.displayName = 'BlogForm'

export default BlogForm