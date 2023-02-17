import { useRef } from 'react'
import BlogForm from './BlogForm'
import Blogs from './Blogs'

const Home = () => {
  const formRef = useRef()
  const toggleForm = () => {
    formRef.current.toggleVisibility()
  }

  return (
    <div>
      <BlogForm toggleForm={toggleForm} ref={formRef}/>
      <Blogs toggleForm={toggleForm} />
    </div>
  )
}

export default Home