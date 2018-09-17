import axios from 'axios'

const postForm = (url, payload) => {
  console.log(payload, url)
  return axios.post(url, JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export default {
  postForm
}