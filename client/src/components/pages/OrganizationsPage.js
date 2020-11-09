import React, { useContext, useEffect } from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationFilter from '../organizations/OrganizationFilter';
import OrganizationButton from '../organizations/OrganizationButton';
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
            <Row>
                <OrganizationButton />
            </Row>
        </Container>


    )
}

export default OrganizationsPage;