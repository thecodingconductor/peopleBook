import React from 'react';
import Organizations from '../organizations/Organizations';

import OrganizationFilter from '../organizations/OrganizationFilter';
import Contacts from '../contacts/Contacts';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
    return (

        <Container>


            <Row>
                <Col>
                    <Card bg="primary" style={{ height: "18rem", marginTop: "5rem" }}>
                        <Card.Header style={{ textAlign: "center" }}>View By Organizations</Card.Header>
                        <Button href='/organizations' variant="primary">Go now</Button>
                    </Card>

                </Col>
                <Col>
                    <Card bg="success" style={{ height: "18rem", marginTop: "5rem" }}>
                        <Card.Header style={{ textAlign: "center" }}>View By People</Card.Header>
                        <Button href='/people' variant="primary">Go now</Button>
                    </Card>

                </Col>
            </Row>

        </Container >


    )
}


export default Home;