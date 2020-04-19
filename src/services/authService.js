import http from "./httpService"
import { endpoint } from "../config.json"
import jwtDecode from "jwt-decode"

const tokenKey = "token"

http.setJwt(getJwt())

export async function login(email, password) {
  const { data: jwt } = await http.post(endpoint + "/auth", { email, password })
  localStorage.setItem(tokenKey, jwt)
}

export function logout() {
  localStorage.removeItem(tokenKey)
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt)
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey)
    return jwtDecode(jwt)
  } catch (error) {
    console.log(`%c nobody logged`, "border:1px dashed white")
    return null
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey)
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
}
