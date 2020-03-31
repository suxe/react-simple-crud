import React, { Component } from "react";

class Pagination extends Component {
  createPagination = () => {
    const pagination = [];
    const pageItems = this.createPageItems();
    pagination.push(pageItems);

    if (this.props.current > 1) {
      const previous = this.createPrevious();
      pagination.unshift(previous);
    }

    if (this.props.current !== this.props.pages) {
      const next = this.createNext();
      pagination.push(next);
    }
    // this.setState({ pagination });
    return pagination;
  };

  createPageItems = () => {
    const { pages, current } = this.props;
    const items = [];
    for (let i = 0; i < pages; i++) {
      items.push(
        <li
          key={i.toString()}
          className={`page-item ${current === i + 1 ? "active" : ""}`}
          onClick={_e => this.props.onPaginate(i + 1)}
        >
          <span className="page-link">{i + 1}</span>
        </li>
      );
    }
    return items;
  };

  createPrevious = () => {
    return (
      <li
        key={"prev"}
        className="page-item"
        onClick={_e => this.props.onPaginate(this.props.current - 1)}
      >
        <span className="page-link">Previous</span>
      </li>
    );
  };

  createNext = () => {
    return (
      <li
        key={"next"}
        className="page-item"
        onClick={_e => this.props.onPaginate(this.props.current + 1)}
      >
        <span className="page-link">Next</span>
      </li>
    );
  };

  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination" style={{ cursor: "pointer" }}>
          {this.createPagination()}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
