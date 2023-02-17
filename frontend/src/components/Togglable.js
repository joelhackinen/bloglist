import { useState, useImperativeHandle, forwardRef } from 'react'
import { Offcanvas } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  const toggleVisibility = () => setShow(!show)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Offcanvas show={show} onHide={toggleVisibility} placement={props.placement}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{props.titleText}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {props.children}
      </Offcanvas.Body>
    </Offcanvas>
  )
})

Togglable.displayName = 'Togglable'


export default Togglable