import http from "./httpService"
import { endpoint } from "../config.json"

// We don't use async/await here, we will use it when we call to this function. Otherwise we will being duplicating unnnecessary promises

export const getMovies = () => {
  return http.get(endpoint + "movies")
}

export const getMovie = (id) => {
  return http.get(endpoint + "movies/" + id)
}

export const saveMovie = (movie) => {
  if (movie._id) {
    const body = { ...movie }
    delete body._id
    return http.put(endpoint + "movies/" + movie._id, body)
  }

  return http.post(endpoint + "movies/", movie)
}
// export function saveMovie(movie) {
//   let movieInDb = movies.find((m) => m._id === movie._id) || {}
//   movieInDb.title = movie.title
//   movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId)
//   movieInDb.numberInStock = movie.numberInStock
//   movieInDb.dailyRentalRate = movie.dailyRentalRate

//   if (!movieInDb._id) {
//     movieInDb._id = String(Date.now())
//     movies.push(movieInDb)
//   }

//   return movieInDb
// }

export const deleteMovie = (id) => {
  return http.delete(endpoint + "movies/" + id)
}
