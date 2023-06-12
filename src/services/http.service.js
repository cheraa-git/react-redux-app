import axios from 'axios'

const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

const httpService = {
  get: http.get,
  post: http.post
}

export default httpService
