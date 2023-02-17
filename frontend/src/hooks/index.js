import { useState } from 'react'

export const useField = (name, type) => {
  const [value, setValue] = useState('')
  const id = `${name}-input`

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    id,
    reset,
    onChange
  }
}