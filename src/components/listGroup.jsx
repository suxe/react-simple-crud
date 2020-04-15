import React from "react"
import PropTypes from "prop-types"

const ListGroup = (props) => {
  const {
    items,
    selectedItem,
    onItemSelect,
    textProperty,
    valueProperty,
  } = props
  const classes = "list-group-item list-group-item-action"

  return (
    <div className="list-group">
      {items.map((item) => (
        <button
          key={item[valueProperty] || "all"}
          className={
            selectedItem === item[valueProperty] ? classes + " active" : classes
          }
          onClick={(_e) => onItemSelect(item[valueProperty])}
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  )
}

// To avoid passing this unnecesary properties
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
}

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired,
  ]),
  onItemSelect: PropTypes.func.isRequired,
  textProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
}

export default ListGroup
