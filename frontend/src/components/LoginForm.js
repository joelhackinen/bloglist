import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'


const LoginForm = () => {
  const dispatch = useDispatch()
  const { reset: resetUsername, ...username } = useField('username', 'text')
  const { reset: resetPassword, ...password } = useField('password', 'password')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(
      username.value,
      password.value
    ))
  }

  return (
    <div>
      <div>
        <h2>Login</h2>
      </div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            { ...username }
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            { ...password}
          />
          <Button style={{ marginTop: 5 }} variant="primary" id="login-button" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}


export default LoginForm