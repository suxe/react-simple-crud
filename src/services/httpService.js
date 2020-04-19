import axios from "axios"
import { toast } from "react-toastify"

// Axios Interceptor.
axios.interceptors.response.use(
  null /* sucess */,
  /* error */ (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    if (!expectedError) {
      console.log("ERROR REQUEST: ", error)
      toast.error("Unexpected error - server")
    }
    return Promise.reject(error)
  }
)

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
}
