import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';
import cancel from '../layout/cancel.svg';
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

    const onClick = e => {
        console.log(e.target);
    }

    return (
        <Card className="responsive-shrink">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center card-top-row">
                    <Card.Title>
                        {name}
                    </Card.Title>
                    <img src={cancel} alt="Close" style={{ height: "1rem", width: "1rem" }} onClick={onRemove} />
                </div>

                <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: ".8rem", fontWeight: 200 }}>
                    {organization}
                </Card.Subtitle>

                <div className="d-flex align-items-center card-alert-container">
                    <i className="fas fa-exclamation-circle card-alert-icon"></i>
                    <Badge variant={needToContact === false ? "success" : "danger"}>{needToContact === false ? "Recently Contacted" : "Contact ASAP"}</Badge>
                </div>


                <hr></hr>
                <div className="check-box-container">
                    <input type="checkbox" name="remove" id="removeVIP" className="remove-vip-checkbox" onClick={onRemove} />

                    <label htmlFor="removeVIP">Mark task as done</label>
                </div>

            </Card.Body>

        </Card >
    )
}

UrgentItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default UrgentItem;