import React from "react"
import Like from "./like"
import PropTypes from "prop-types"

const TableBody = props => {
  const { items, onLike, onDelete } = props
  return (
    <tbody>
      {items.map(item => (
        <tr key={item._id}>
          <th scope="row">{item.title}</th>
          <td>{item.genre.name}</td>
          <td>{item.numberInStock}</td>
          <td>{item.dailyRentalRate}</td>
          <td>
            <Like active={item.liked || false} onLike={_e => onLike(item)} />
          </td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              style={{ cursor: "pointer" }}
              onClick={_e => onDelete(item._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

TableBody.propTypes = {
  items: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default TableBody
