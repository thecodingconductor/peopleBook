import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';
import Cancel from '../../components/layout/Cancel';
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
                <div className="d-flex justify-content-between align-items-center card-top-row">
                    <Card.Title>
                        {name}
                    </Card.Title>
                    <Cancel />
                </div>

                <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: ".8rem", fontWeight: 200 }}>
                    {organization}
                </Card.Subtitle>

                <div className="custom-control custom-checkbox">
                    <input type="checkbox" name="checkbox" id="customCheck" className="custom-control-input" />
                </div>

                <InputGroup className="mb-3">
                    <InputGroup.Checkbox ></InputGroup.Checkbox>
                    <Badge variant={needToContact === false ? "success" : "danger"}>{needToContact === false ? "Recently Contacted" : "Need to Contact"}</Badge>
                </InputGroup>
                <hr></hr>
            </Card.Body>

        </Card >
    )
}

UrgentItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default UrgentItem;