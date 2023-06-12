import axios from 'axios'

const http = axios.create({
  baseURL: 'https://jslonplaceholder.typicode.com/'
})

const httpService = {
  get: http.get
}

export default httpService
