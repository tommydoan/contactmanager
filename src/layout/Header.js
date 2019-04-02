import React from 'react'
import {Link} from 'react-router-dom';
function Header(props) {
    const {branding}=props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3 py-0">
        <div className="container">
            <a href="/" className="navbar-brand">{branding}</a>
            <div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link"><i className="fas fa-home" />Home</Link>
                    </li>         
                    <li className="nav-item">
                        <Link to="/addcontact" className="nav-link"><i className="fas fa-plus" />AddContact</Link>
                    </li>       
                    <li className="nav-item">
                        <Link to="/about" className="nav-link"><i className="fas fa-question" />About</Link>
                    </li>              
                </ul>
            </div>
        </div>
    </nav>
  )
}
Header.defaultProps={
    branding:'Contact Manager'
}
export default Header;