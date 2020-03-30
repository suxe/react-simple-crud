import React from "react";

const Like = props => {
  return (
    <i
      className={`fa fa-heart${props.active ? "" : "-o"}`}
      style={{ cursor: "pointer" }}
      onClick={props.onLike}
    ></i>
  );
};

export default Like;
