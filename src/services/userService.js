import http from "./httpService"
import { endpoint } from "../config.json"

const apiEndpoint = endpoint + "/users"

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  })
}
