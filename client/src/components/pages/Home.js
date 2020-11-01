import React from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationFilter from '../organizations/OrganizationFilter';
import Contacts from '../contacts/Contacts';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    return (

        <Container>

            <Row>
                <OrganizationFilter />
            </Row>

            <Row>
                <Organizations />
            </Row>
            <Row>
                <Contacts />
            </Row>
        </Container >


    )
}


export default Home;