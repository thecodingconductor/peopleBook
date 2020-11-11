import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';
import { Card, InputGroup, Badge } from 'react-bootstrap';

const UrgentItem = ({ contact }) => {

    const contactContext = useContext(ContactContext);
    const { _id, name, organization, position, email, lastContacted, needToContact } = contact;

    const authContext = useContext(AuthContext);
    const { user, removeFromToDoList } = authContext;

    const UrgentItem = {
        _id,
        name,
        organization,
        position,
        email,
        lastContacted,
        needToContact
    }

    const onRemove = e => {
        removeFromToDoList(UrgentItem, user._id);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {organization}
                </Card.Subtitle>
                <Card.Link href="#">{email}</Card.Link>
                <InputGroup className="mb-3">
                    <InputGroup.Checkbox></InputGroup.Checkbox>
                    <Badge variant={needToContact === false ? "success" : "danger"}>{needToContact === false ? "Recently Contacted" : "Need to Contact"}</Badge>
                </InputGroup>
                <i className="fas fa-window-close" style={{ cursor: "pointer" }} onClick={onRemove} ></i>
            </Card.Body>

        </Card>
    )
}

UrgentItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default UrgentItem;