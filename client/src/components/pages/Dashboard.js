import React, { useContext, useEffect } from 'react';
import UrgentList from '../urgent/UrgentList';
import VipList from '../vips/VipList';
import AuthContext from '../../context/auth/authContext';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';


const Dashboard = () => {

    const authContext = useContext(AuthContext);
    const { loadUser, user } = authContext;
    // console.log(`from before use effect > ${authContext}`)
    // console.log(` user object ${authContext.user}`);




    // useEffect(() => {
    //     loadUser();
    //     console.log(`from dashboard page useEffect> ${authContext.user}`);
    //     // eslint-disable-next-line
    // }, []);

    // console.log(user.VIPS);

    return (
        <div>
            <h2>Dashboard</h2>

            <Container className="top-container" style={{ marginBottom: "5rem" }}>
                <Row>
                    <Col className="top-left">
                        <h1>Urgent Tasks</h1>
                        <UrgentList />
                    </Col>
                    <Col xs={6} className="top-right">
                        <h1>VIPS</h1>
                        <Container>
                            <VipList />
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Container className="bottom-buttons">
                <Row>
                    <Button variant="primary" href="/organizations" block>View All Organizations</Button>
                </Row>
            </Container>

        </div>
    )
}


export default Dashboard;