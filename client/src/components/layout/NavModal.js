import React, { Fragment, useContext } from 'react';

// import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const NavModal = () => {


    const authContext = useContext(AuthContext);

    const { logout, user } = authContext;

    const onLogout = () => {
        logout();
    }

    const guestLinks = (
        <Fragment>
            <Link to='/register'>Register</Link>
            <Link to="/login">Login</Link>
        </Fragment>
    )

    const authLinks = (
        <Fragment>
            <Link to="/dashboard" >Dashboard</Link>
            <Link to="/organizations" >Organizations</Link>
            <hr />
            <a href="#" onClick={onLogout}>Logout</a>
        </Fragment>

    )

    return (
        <Fragment>
            <div className="position-absolute nav-modal-container">
                <div className="d-flex flex-column align-items-center nav-modal-links-container">

                    {user ? authLinks : guestLinks}

                </div>
            </div>
        </Fragment>
    )
}

export default NavModal