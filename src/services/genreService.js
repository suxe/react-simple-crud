import http from "./httpService"
import { endpoint } from "../config.json"

const getGenres = () => {
  return http.get(endpoint + "genres")
}

export { getGenres }
