import { useState } from 'react'
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap'
import { useField } from '../hooks'


const CommentForm = ({ commentHandler }) => {
  const { reset, ...comment } = useField('comment', 'text')
  const [showOverlay, setShowOverlay] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    commentHandler(comment.value)
    reset()
    setShowOverlay(!showOverlay)
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{'Be nice :)'}</Popover.Header>
      <Popover.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              { ...comment }
            />
          </Form.Group>
          <Button style={{ marginTop: 5 }} type="submit">
            add
          </Button>
        </Form>
      </Popover.Body>
    </Popover>
  )

  return (
    <OverlayTrigger show={showOverlay} placement="right" overlay={popover}>
      <Button variant="success" onClick={() => setShowOverlay(!showOverlay)}>
        Leave a comment
      </Button>
    </OverlayTrigger>
  )
}


export default CommentForm