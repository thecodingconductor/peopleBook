import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';


const ContactItem = ({ contact }) => {

    const contactContext = useContext(ContactContext);
    const { id, name, organization, position, email, phone, lastContacted, needToContact, notes } = contact;



    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{organization}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{position}</Card.Subtitle>

                <Badge variant={needToContact === false ? "success" : "danger"}>{needToContact === false ? "No need to contact" : "Contact person"}</Badge>

                {/* <ButtonGroup toggle>
                    <ToggleButton type="radio" variant="secondary" name="radio">
                        {needToContact}
                    </ToggleButton>
                </ButtonGroup> */}


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