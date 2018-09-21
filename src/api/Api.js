import axios from 'axios'

const postForm = (url, payload) => {
  return axios.post(url, JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export default {
  postForm
}