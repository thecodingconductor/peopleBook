import React from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationItem from '../organizations/OrganizationItem';
import OrganizationFilter from '../organizations/OrganizationFilter';
import Contacts from '../contacts/Contacts';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    return (

        <Container>
            <Row>
                <Col>
                    <OrganizationFilter />
                </Col>
                <Col>
                    <Row>
                        <Organizations />
                    </Row>
                </Col>
            </Row>

        </Container>


    )
}


export default Home;