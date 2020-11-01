import React from 'react';
import Contacts from '../contacts/Contacts';
import { Container, Row } from 'react-bootstrap';


const People = () => {
    return (
        <Container>
            <Row >
                <Contacts />
            </Row>

        </Container>


    )
}

export default People;