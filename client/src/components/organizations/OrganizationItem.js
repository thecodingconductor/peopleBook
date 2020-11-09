import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import OrganizationContext from '../../context/organization/organizationContext';
import ContactContext from '../../context/contact/contactContext';
import Card from 'react-bootstrap/Card';

const OrganizationItem = ({ organization }) => {

    const organizationContext = useContext(OrganizationContext);
    const contactContext = useContext(ContactContext);
    const { filterContacts } = contactContext;
    const { setCurrent } = organizationContext;
    const { id, name, website, group, address, phone } = organization;
    // console.log(organization);

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title style={{ cursor: "pointer" }} onClick={() => {
                    setCurrent(organization)
                    filterContacts(organization.name)
                }}>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{group}</Card.Subtitle>
                <Card.Text>
                    {address}
                </Card.Text>
                <Card.Link href={`${website}`} target="_blank">{website}</Card.Link>
            </Card.Body>
        </Card >
    )
}

OrganizationItem.propTypes = {
    organization: PropTypes.object.isRequired
}

export default OrganizationItem;