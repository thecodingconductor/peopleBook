import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom';
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
            <div className="d-flex justify-content-start align-items-center">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                {/* <Nav.Link href="/people">People</Nav.Link> */}
                <Nav.Link href="/organizations">Organizations</Nav.Link>
            </div>
            <div className="d-flex justify-content-start align-items-center">
                <ReactNav.Text>Hello, {user && user.name}</ReactNav.Text>
                <Nav.Link onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
                </Nav.Link>
            </div>



        </Fragment>
    )

    const guestLinks = (
        <Fragment>

            <Nav.Link href='/register'>Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>

        </Fragment>

    )

    return (
        <ReactNav variant="dark" expand="lg" className="d-flex justify-content-center nav-background-purple">
            <span className="navbar-toggler-icon toggler-left"></span>
            <ReactNav.Brand href="/" className="nav-bar-title-main">{title}</ReactNav.Brand>
            <Nav className={`mr-auto d-flex ${isAuthenticated ? 'justify-content-between' : 'justify-content-start'} nav-bar-responsive-links`} style={{ width: "100%" }}>

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
    title: "OrchesNation",
    icon: 'fas fa-id-card-alt'
}

export default Navbar;