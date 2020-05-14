import React, { Component } from "react";

class Search extends Component {
  state = { searchQuery: "" };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-inline mt-3">
        <input
          className="form-control mr-sm-2"
          name="searchQuery"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={()=>this.handleSearch(this.state.searchQuery)}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    );
  }
}

export default Search;
