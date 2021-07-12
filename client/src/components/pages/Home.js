import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

import { Container, Row, Button } from 'react-bootstrap';

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

            </Row>


        </Container >


    )
}


export default Home;