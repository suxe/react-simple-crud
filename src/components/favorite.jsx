import React, { Component } from "react";

class Favorite extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     active: props.active
  //   };
  // }

  render() {
    return (
      <i
        className={`fa fa-heart${this.props.active ? "" : "-o"}`}
        onClick={this.props.onFavorite}
      ></i>
    );
  }
}

export default Favorite;
