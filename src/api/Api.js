import axios from 'axios'

export const postForm = (url, payload) => {
  return axios.post(url, JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const getRoute = (url) => {
  return axios.get(url)
}
