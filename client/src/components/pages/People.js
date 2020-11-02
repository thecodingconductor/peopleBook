import React from 'react';
import Contacts from '../contacts/Contacts';
import ContactFilter from '../contacts/ContactFilter';
import { Container, Row } from 'react-bootstrap';


const People = () => {
    return (
        <Container>
            <Row>
                <ContactFilter />
            </Row>
            <Row >
                <Contacts />
            </Row>

        </Container>


    )
}

export default People;