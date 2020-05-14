import React, { Component } from "react";
// import Categories from "./categories";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="copyright_section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="copyright">
                <p className="text-center p_copyright">
                  All rights reserved for ruby team 2020
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
