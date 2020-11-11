import React, { Fragment, useContext } from 'react';
import { Button } from 'react-bootstrap';
import OrganizationContext from '../../context/organization/organizationContext';
import ContactContext from '../../context/contact/contactContext';
const orgData = require('../../organizations.json');

const OrganizationButton = props => {

    const organizationContext = useContext(OrganizationContext);
    const contactContext = useContext(ContactContext);
    const { clearCurrent } = organizationContext;
    const { clearContactFilter } = contactContext;

    const onClick = e => {
        e.preventDefault();

        clearCurrent();
        clearContactFilter();

        // orgData["organizations"].forEach(org => {

        //     addOrgs(org);

        // })
    }

    return (
        <Fragment>
            <Button onClick={onClick}>Back to All Organizations</Button>
        </Fragment>
    )
}

export default OrganizationButton;
