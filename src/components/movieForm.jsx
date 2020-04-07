import React from "react"
import { useParams, useHistory } from "react-router-dom"

const MovieForm = () => {
  const { id } = useParams()
  const { push } = useHistory()

  return (
    <div>
      <h1>Form: {id}</h1>
      <button onClick={(_e) => push("/movies")} className="btn btn-primary">
        Submit
      </button>
    </div>
  )
}

export default MovieForm
