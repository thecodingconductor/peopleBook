import React, { Fragment, useContext } from 'react';
import { Button } from 'react-bootstrap';
import OrganizationContext from '../../context/organization/organizationContext';
const orgData = require('../../organizations.json');

const OrganizationButton = props => {

    const organizationContext = useContext(OrganizationContext);
    const { clearCurrent } = organizationContext;

    const onClick = e => {
        e.preventDefault();

        clearCurrent();

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
