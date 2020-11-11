import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';
import { Card } from 'react-bootstrap';

const UrgentItem = ({ contact }) => {

    const contactContext = useContext(ContactContext);
    const { _id, name, organization, position, email, lastContacted } = contact;

    const authContext = useContext(AuthContext);
    const { user, removeFromToDoList } = authContext;

    const UrgentItem = {
        _id,
        name,
        organization,
        position,
        email,
        lastContacted
    }

    const onRemove = e => {
        removeFromToDoList(UrgentItem, user._id);
    }

    return (
        <Card>
            <Card.Body>
                {name}{' '}{organization}{" "}<Card.Link href="#">{email}</Card.Link>
                <i className="fas fa-window-close" style={{ cursor: "pointer" }} onClick={onRemove} ></i>
            </Card.Body>

        </Card>
    )
}

UrgentItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default UrgentItem;