import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import { Card } from 'react-bootstrap';

const UrgentItem = ({ contact }) => {

    const contactContext = useContext(ContactContext);
    const { name, organization, email, lastContacted } = contact;


    return (
        <Card>
            <Card.Body>
                {name}{' '}{organization}{" "}<Card.Link href="#">{email}</Card.Link>
                <i className="fas fa-window-close"></i>
            </Card.Body>

        </Card>
    )
}

UrgentItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default UrgentItem;