import React, { useContext, useEffect } from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationFilter from '../organizations/OrganizationFilter';
import Contacts from '../contacts/Contacts';
import AuthContext from '../../context/auth/authContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {

    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, [])


    return (

        <Container>

            <Row>
                <Button className="to-dashboard-button" href="/dashboard" variant="primary" block style={{
                    marginTop: "5rem"
                }}>Visit Dashboard</Button>
            </Row>

            <Row>

                <Button href='/organizations' variant="primary" className="to-organization-button" block style={{ marginTop: "2rem" }}> View By Organizations</Button>



                {/* <Col>
                    <Card bg="success" style={{ height: "18rem", marginTop: "5rem" }}>
                        <Card.Header style={{ textAlign: "center" }}>View By People</Card.Header>
                        <Button href='/people' variant="primary">Go now</Button>
                    </Card>

                </Col> */}
            </Row>

        </Container >


    )
}


export default Home;