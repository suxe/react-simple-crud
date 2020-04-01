import React from "react";
import PropTypes from "prop-types";

const ListGroup = props => {
  const {
    items,
    selectedItem,
    onItemSelect,
    textProperty,
    valueProperty
  } = props;
  const classes = "list-group-item list-group-item-action";

  return (
    <div className="list-group">
      <button
        key={null}
        className={selectedItem === null ? classes + " active" : classes}
        onClick={_e => onItemSelect(null)}
      >
        All
      </button>
      {items.map(item => (
        <button
          key={item[valueProperty]}
          className={
            selectedItem === item[textProperty] ? classes + " active" : classes
          }
          onClick={_e => onItemSelect(item[textProperty])}
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  );
};

// To avoid passing this unnecesary properties
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired
  ]),
  onItemSelect: PropTypes.func.isRequired,
  textProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired
};

export default ListGroup;
