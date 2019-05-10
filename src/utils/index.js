import axios from 'axios'

const fetch = axios.create({
  baseURL: 'https://api.example.com'
})

fetch.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

fetch.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export {fetch}
