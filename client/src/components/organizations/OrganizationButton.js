import React, { Fragment, useContext } from 'react';
// import { Button } from 'react-bootstrap';
import OrganizationContext from '../../context/organization/organizationContext';
import ContactContext from '../../context/contact/contactContext';
// const orgData = require('../../organizations.json');

const OrganizationButton = props => {

    const organizationContext = useContext(OrganizationContext);
    const contactContext = useContext(ContactContext);
    const { clearCurrent } = organizationContext;
    const { clearContactFilter } = contactContext;

    const onClick = e => {
        e.preventDefault();

        clearCurrent();
        clearContactFilter();

    }

    return (
        <Fragment>
            <p className="text-secondary text-muted" style={{ marginLeft: "1.8rem", cursor: 'pointer' }} onClick={onClick}>Back</p>
        </Fragment >
    )
}

export default OrganizationButton;
