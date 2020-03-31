import React from "react";
import PropTypes from "prop-types";

const Like = props => {
  return (
    <i
      className={`fa fa-heart${props.active ? "" : "-o"}`}
      style={{ cursor: "pointer" }}
      onClick={props.onLike}
    ></i>
  );
};

Like.propTypes = {
  active: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired
};

export default Like;
