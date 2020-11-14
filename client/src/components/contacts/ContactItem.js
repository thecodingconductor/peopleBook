import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import Card from 'react-bootstrap/Card';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/auth/authContext';
import InputGroup from 'react-bootstrap/InputGroup';


const ContactItem = ({ contact }) => {

    const authContext = useContext(AuthContext);
    // const contactContext = useContext(ContactContext);
    const { user, addToVIPS } = authContext;
    const { _id, name, organization, position, needToContact, notes } = contact;

    const contactObj = {
        _id,
        name,
        organization,
        position,
        needToContact
    }

    const onClick = e => {
        e.preventDefault();
        // console.log(user);
        // console.log(user._id);
        // console.log(name);
        addToVIPS(contactObj, user._id);
    }


    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{organization}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{position}</Card.Subtitle>

                {/* <Badge variant={needToContact === false ? "success" : "danger"}>{needToContact === false ? "No need to contact" : "Contact person"}</Badge> */}

                {/* <ButtonGroup toggle>
                    <ToggleButton type="radio" variant="secondary" name="radio">
                        {needToContact}
                    </ToggleButton>
                </ButtonGroup> */}

                {/* <Button variant="info" onClick={onClick}>Add to VIP List</Button> */}


                <InputGroup>
                    <InputGroup.Checkbox></InputGroup.Checkbox>
                    <InputGroup.Text>Add to Urgent List</InputGroup.Text>
                    {' '}
                    <InputGroup.Checkbox></InputGroup.Checkbox>
                    <InputGroup.Text>Add to VIPs</InputGroup.Text>
                </InputGroup>


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