import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import OrganizationContext from '../../context/organization/organizationContext';
import Card from 'react-bootstrap/Card';

const OrganizationItem = ({ organization }) => {

    const organizationContext = useContext(OrganizationContext);
    const { id, name, website, category, address, phone } = organization;
    console.log(organization);

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
                <Card.Text>
                    {address}
                </Card.Text>
                <Card.Link>{website}</Card.Link>
            </Card.Body>
        </Card>
    )
}

OrganizationItem.propTypes = {
    organization: PropTypes.object.isRequired
}

export default OrganizationItem;