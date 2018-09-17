import axios from 'axios'

const postForm = (payload, url) => {
  axios.post(url, payload)
}

export default postForm