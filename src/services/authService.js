import http from "./httpService"
import { endpoint } from "../config.json"

export function login(email, password) {
  return http.post(endpoint + "/auth", { email, password })
}
