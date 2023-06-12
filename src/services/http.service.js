import axios from 'axios'

const http = axios.create({
  baseURL: 'https://js1onplaceholder.typicode.com/'
})

const httpService = {
  get: http.get
}

export default httpService
