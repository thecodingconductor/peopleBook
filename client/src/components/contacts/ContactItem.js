import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import AuthContext from '../../context/auth/authContext';


const ContactItem = ({ contact }) => {

    const authContext = useContext(AuthContext);

    const { user, addToVIPS, addToUrgent } = authContext;
    const { _id, name, organization, position, needToContact, notes } = contact;

    const contactObj = {
        _id,
        name,
        organization,
        position,
        needToContact
    }

    const onVIPClick = e => {
        setTimeout(() => e.target.checked = false, 300);
        addToVIPS(contactObj, user._id);
    }

    const onUrgentClick = e => {
        setTimeout(() => e.target.checked = false, 300);
        addToUrgent(contactObj, user._id);
    }

    return (
        <Card className="responsive-shrink">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{organization}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{position}</Card.Subtitle>

                <hr></hr>

                <div className="check-box-container">
                    <input type="checkbox" name="addUrgent" id="addToUrgent" className="remove-vip-checkbox" onClick={onUrgentClick} />
                    <label htmlFor="addToUrgent">Add to Urgent Tasks</label>
                </div>
                <div className="check-box-container move-to-urgent-container">
                    <input type="checkbox" name="addVIP" id="addToVIP" className="remove-vip-checkbox move-to-urgent-checkbox" onClick={onVIPClick} />
                    <label htmlFor="addToVIP">Add to VIPS</label>
                </div>

                <Card.Text>
                    {notes}
                </Card.Text>

            </Card.Body>
        </Card>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;