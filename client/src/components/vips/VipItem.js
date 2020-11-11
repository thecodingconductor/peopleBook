import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';
import { Card, Badge, Button } from 'react-bootstrap';
import { GET_VIPS } from '../../context/types';

const VipItem = ({ contact }) => {

    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);

    const { _id, name, organization, position, email, needToContact } = contact;
    const { addToUrgent, user, removeFromVIPS, clearVIP, getVIPS } = authContext;


    const VIPItem = {
        _id,
        name,
        organization,
        position,
        needToContact
    }

    const onRemove = () => {
        removeFromVIPS(VIPItem, user._id);
    }

    const onClick = () => {

    }

    return (
        <Card style={{ width: "100%", margin: "2rem" }}>
            <Card.Body>
                <Card.Title>
                    {name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{organization}</Card.Subtitle>
                {email ? <Card.Link href="#">{email}</Card.Link> : ''}

                <Badge variant={needToContact === false ? "success" : "danger"}>{needToContact === false ? "No need to Contact" : "Need to Contact"}</Badge>
                <Button variant="danger" onClick={onRemove}  >Remove VIP</Button>
                <Button variant="success" onClick={() => addToUrgent(VIPItem, user._id)}>Add to Urgent List</Button>
            </Card.Body>
        </Card>
    )
}

VipItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default VipItem;