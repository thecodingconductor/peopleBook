import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import OrganizationContext from '../../context/organization/organizationContext';
import ContactContext from '../../context/contact/contactContext';
import Card from 'react-bootstrap/Card';

const OrganizationItem = ({ organization, addClass }) => {

    const organizationContext = useContext(OrganizationContext);
    const contactContext = useContext(ContactContext);
    const { filterContacts } = contactContext;
    const { setCurrent } = organizationContext;
    const { name, website, group, address } = organization;



    

    return (
        <Card className={`responsive-shrink ${addClass && addClass}`} >
            <Card.Body>
                <Card.Title style={{ cursor: "pointer", fontSize: '1rem' }} onClick={() => {
                    setCurrent(organization)
                    filterContacts(organization.name)
                }}>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{group}</Card.Subtitle>
                <Card.Text className="text-secondary text-muted organization-address">
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