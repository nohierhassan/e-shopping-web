import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  state = {};
  render() {
    const { productsCount, pageSize, onPageChange, currentPage } = this.props;
    const pagesCount = productsCount / pageSize;
    const pages = _.range(1, pagesCount + 1);
    if (pagesCount <= 1) return null;
    return (
      <nav
        className="mt-5"
        aria-label="Page navigation example"
        style={{
          cursor: "pointer",
        }}
      >
        <ul className="pagination">
          {pages.map((page) => (
            <li key={page} className={this.currentPageClass(page, currentPage)}>
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}{" "}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  currentPageClass = (page, currentPage) => {
    let cls = "page-item";
    return (cls += currentPage === page ? " active" : "");
  };
}
Pagination.propTypes = {
  productsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
