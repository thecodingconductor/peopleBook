import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';
import { Container, Row } from 'react-bootstrap';


const People = () => {

    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, [])
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