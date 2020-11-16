import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom';
import { Navbar as ReactNav, Nav } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import NavContext from '../../context/nav/navContext';
import NavModal from './NavModal';


const Navbar = ({ title, icon }) => {


    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const navContext = useContext(NavContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext;
    const { showModal, showModalFunc, hideModalFunc } = navContext;

    // const [modal, setModal] = useState();

    const onLogout = () => {
        logout();
        clearContacts();
    }

    const onClick = () => {
        if (showModal === false) {
            showModalFunc()
        } else {
            hideModalFunc();
        }
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
        <Fragment>
            <ReactNav variant="dark" expand="lg" className="d-flex justify-content-center nav-background-purple">
                {showModal ? <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={onClick} className="close-modal-icon">
                    <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg> : <span className="navbar-toggler-icon toggler-left" onClick={onClick}></span>}
                <ReactNav.Brand href="/" className="nav-bar-title-main">{title}</ReactNav.Brand>
                <Nav className={`mr-auto d-flex ${isAuthenticated ? 'justify-content-between' : 'justify-content-start'} nav-bar-responsive-links`} style={{ width: "100%" }}>

                    {isAuthenticated ? authLinks : guestLinks}

                </Nav>


            </ReactNav >
            {showModal === true && <NavModal />}
        </Fragment>
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