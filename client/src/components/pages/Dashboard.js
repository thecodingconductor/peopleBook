import React from 'react';
import UrgentList from '../urgent/UrgentList';
import VipList from '../vips/VipList';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';


const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>

            <Container className="top-container" style={{ marginBottom: "5rem" }}>
                <Row>
                    <Col className="top-left">
                        <h1>Urgent Tasks</h1>
                        <UrgentList />
                    </Col>
                    <Col className="top-right">
                        <h1>VIPS</h1>
                        <Container>
                            <VipList />
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Container className="bottom-buttons">
                <Row>
                    <Col>
                        <Button variant="primary" href="/organizations" block>View All Organizations</Button>
                    </Col>
                    <Col>
                        <Button variant="primary" href="/people" block>View All People</Button>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}


export default Dashboard;