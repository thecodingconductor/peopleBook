import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';
import Cancel from '../../components/layout/Cancel';
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
                {email ? <Card.Link href="#">{email}</Card.Link> : ''}
                <div className="d-flex align-items-center card-alert-container">
                    <i className="fas fa-exclamation-circle card-alert-icon"></i>
                    <Badge variant={needToContact === false ? "success" : "danger"}>{needToContact === false ? "Recently Contacted" : "Contact ASAP"}</Badge>
                </div>

                <hr></hr>
                <div className="check-box-container">
                    <input type="checkbox" name="remove" id="removeVIP" className="remove-vip-checkbox" />
                    <span className="invisible-checkbox"></span>
                    <label htmlFor="removeVIP">Mark task as done</label>
                </div>
                <div className="check-box-container move-to-urgent-container">
                    <input type="checkbox" name="remove" id="removeVIP" className="remove-vip-checkbox move-to-urgent-checkbox" />
                    <span className="invisible-checkbox move-to-urgent"></span>
                    <label htmlFor="removeVIP">Move to urgent</label>
                </div>

                {/* <Button variant="danger" onClick={onRemove}  >Remove VIP</Button>
                <Button variant="success" onClick={() => addToUrgent(VIPItem, user._id)}>Add to Urgent List</Button> */}
            </Card.Body>
        </Card>
    )
}

VipItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default VipItem;