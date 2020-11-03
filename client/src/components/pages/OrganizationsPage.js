import React, { useContext, useEffect } from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationFilter from '../organizations/OrganizationFilter';
import AuthContext from '../../context/auth/authContext';
import { Container, Row } from 'react-bootstrap';


const OrganizationsPage = () => {

    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, [])

    return (
        <Container>
            <Row>
                <OrganizationFilter />
            </Row>
            <Row >
                <Organizations />
            </Row>

        </Container>


    )
}

export default OrganizationsPage;