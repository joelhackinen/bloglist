import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {
  const { name } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const style = {
    padding: 10
  }

  const navBrandStyle = {
    fontSize: 30,
    marginLeft: 10
  }

  const toggleStyle = {
    marginRight: 10
  }

  return (
    <div style={style}>
      <Navbar collapseOnSelect expand="sm" bg="light">
        <Navbar.Brand>
          <strong style={navBrandStyle}>Blogapp</strong>
        </Navbar.Brand>
        <Navbar.Toggle style={toggleStyle} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={style} className="m-auto">
            <Nav.Link href="#" as="span">
              <Link to='/'>Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to='/users'>Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <em>{name} logged in </em>
              <Button size="sm" variant="secondary" id="logout-button" onClick={() => dispatch(logout())}>
                logout
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}


export default Menu