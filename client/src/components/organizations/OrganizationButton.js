import React, { Fragment, useContext } from 'react';
import { Button } from 'react-bootstrap';
import OrganizationContext from '../../context/organization/organizationContext';
const orgData = require('../../organizations.json');

const OrganizationButton = props => {

    const organizationContext = useContext(OrganizationContext);
    const { addOrgs } = organizationContext;

    const onClick = e => {
        e.preventDefault();


        orgData["organizations"].forEach(org => {
            // console.log(org);
            // const { name, website, group, phone, address } = org;
            // const data = {
            //     name,
            //     website,
            //     group,
            //     phone,
            //     address
            // }

            addOrgs(org);

        })
    }

    return (
        <Fragment>
            <Button onClick={onClick}>Add Organizations</Button>
        </Fragment>
    )
}

export default OrganizationButton;
