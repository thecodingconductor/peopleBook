import React, { Fragment, useContext, useEffect } from 'react';
import UrgentList from '../urgent/UrgentList';
import VipList from '../vips/VipList';
import AuthContext from '../../context/auth/authContext';
import NavContext from '../../context/nav/navContext';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';


const Dashboard = () => {

    const authContext = useContext(AuthContext);
    const navContext = useContext(NavContext);
    const { loadUser, user } = authContext;
    const { showModal, showModalFunc, hideModalFunc } = navContext;

    useEffect(() => {
        if (showModal) {
            hideModalFunc();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <div className="d-flex justify-content-start align-items-center welcome-message-container">
                <h5>Hello, {user && user.name.split(' ')[0]}</h5>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center dashbord-main-container">
                <div className="d-flex flex-column justify-content-center align-items-center urgent-tasks-container">
                    <h6>Urgent Tasks</h6>
                    <div className="d-flex flex-column justify-content-center align-items-center urgent-tasks">
                        <UrgentList />
                    </div>

                </div>
                <div className="d-flex flex-column justify-content-center align-items-center next-seven-days-container">
                    <h6>Next 7 Days</h6>
                    <div className="d-flex flex-column justify-content-center align-items-center upcoming-items">
                        <VipList />
                    </div>

                </div>
            </div>
            {/* <Container className="top-container" style={{ marginBottom: "5rem" }}>
                <Row>
                    <Col className="top-left">

                    </Col>
                    <Col xs={6} className="top-right">
                        <h1>VIPS</h1>
                        <Container>
                            <VipList />
                        </Container>
                    </Col>
                </Row>
            </Container> */}

            <Container className="bottom-buttons">
                <Row>
                    <Button variant="primary" href="/organizations" block>View All Organizations</Button>
                </Row>
            </Container>

        </Fragment>

    )
}


export default Dashboard;