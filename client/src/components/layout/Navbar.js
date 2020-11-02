import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Navbar as ReactNav } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

const Navbar = ({ title, icon }) => {
    return (
        <ReactNav bg="primary" variant="dark">
            <ReactNav.Brand href="/">Orchestra Contacts</ReactNav.Brand>
            <Nav className="mr-auto">
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
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