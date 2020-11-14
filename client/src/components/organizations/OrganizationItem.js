import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types'
import OrganizationContext from '../../context/organization/organizationContext';
import ContactContext from '../../context/contact/contactContext';
import Card from 'react-bootstrap/Card';

const OrganizationItem = ({ organization }) => {

    const organizationContext = useContext(OrganizationContext);
    const contactContext = useContext(ContactContext);
    const { filterContacts } = contactContext;
    const { setCurrent } = organizationContext;
    const { name, website, group, address } = organization;



    const formatAddress = address => {
        const splitAddress = address.split(',');
        return splitAddress
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title style={{ cursor: "pointer" }} onClick={() => {
                    setCurrent(organization)
                    filterContacts(organization.name)
                }}>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{group}</Card.Subtitle>
                <Card.Text>
                    {/* {address.split(',').map(([s0, s1, s2, s3, s4]) => (
                        <Fragment>
                            <span>{s0}</span>
                            <span>{s1 + s2}</span>
                            <span>{s3 + s4}</span>
                        </Fragment>

                    ))} */}
                    {address}
                </Card.Text>
                <Card.Link href={`${website}`} target="_blank" className="org-website-link">Website</Card.Link>
            </Card.Body>
        </Card >
    )
}

OrganizationItem.propTypes = {
    organization: PropTypes.object.isRequired
}

export default OrganizationItem;