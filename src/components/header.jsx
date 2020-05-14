import React, { Component } from 'react';

class Header extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <div className="header">
                    <div className="layout">
                        <div className="head_part text-center">
                            <h1 className="h1_head">Buy online with Beautify</h1>
                            <p className="p_head">Trusted by over 1,000,000 businesses worldwide We are here for you.</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Header;