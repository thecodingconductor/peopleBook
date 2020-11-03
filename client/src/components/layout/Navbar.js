import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Navbar as ReactNav, Nav } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';


const Navbar = ({ title, icon }) => {


    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext;

    const onLogout = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
            <li>Hello, {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>

            <Nav.Link href='/register'>Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>

        </Fragment>

    )

    return (
        <ReactNav bg="primary" variant="dark">
            <ReactNav.Brand href="/">{title}</ReactNav.Brand>
            <Nav className="mr-auto">

                {isAuthenticated ? authLinks : guestLinks}

            </Nav>
        </ReactNav>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: "Orchestra Contacts",
    icon: 'fas fa-id-card-alt'
}

export default Navbar;