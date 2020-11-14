import React, { Fragment, useContext } from 'react';
import NavContext from '../../context/nav/navContext';
// import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const NavModal = () => {

    const navContext = useContext(NavContext);
    const authContext = useContext(AuthContext);

    const { logout } = authContext;

    const onLogout = () => {
        logout();
    }

    return (
        <Fragment>
            <div className="position-absolute nav-modal-container">
                <div className="d-flex flex-column align-items-center nav-modal-links-container">
                    <Link to="/dashboard" >Dashboard</Link>
                    <Link to="/organizations" >Organizations</Link>
                    <hr />
                    <a href="" onClick={onLogout}>Logout</a>
                </div>
            </div>
        </Fragment>
    )
}

export default NavModal