import React from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationItem from '../organizations/OrganizationItem';
import Contacts from '../contacts/Contacts';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    return (

        <Container>
            <Row>
                <Organizations></Organizations>
            </Row>
            <Row>
                <Contacts></Contacts>
            </Row>
        </Container>


    )
}


export default Home;