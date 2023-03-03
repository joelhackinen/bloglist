import axios from 'axios'
const baseUrl = '/api/me'

const me = async (token) => {
  const response = await axios.post(baseUrl, token)
  return response.data
}

export default { me }