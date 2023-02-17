import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'


const Message = () => {
  const { message, error } = useSelector(state => state.notification)
  if (message === null)
    return null

  return (
    <div className="message">
      <Alert variant={error ? 'danger' : 'success'}>{message}</Alert>
    </div>
  )
}


export default Message