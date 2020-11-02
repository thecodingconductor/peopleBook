import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import { Card, Badge } from 'react-bootstrap';

const VipItem = ({ contact }) => {

    const contactContext = useContext(ContactContext)
    const { name, organization, email, needToContact } = contact;

    return (
        <Card style={{ width: "10rem", margin: "2rem" }}>
            <Card.Body>
                <Card.Title>
                    {name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{organization}</Card.Subtitle>
                <Card.Link href="#">{email}</Card.Link>
                <Badge variant={needToContact === false ? "success" : "danger"}>{needToContact === false ? "No need to Contact" : "Add to Urgent"}</Badge>
            </Card.Body>
        </Card>
    )
}

VipItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default VipItem;