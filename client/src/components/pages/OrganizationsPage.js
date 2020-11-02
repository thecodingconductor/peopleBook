import React from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationFilter from '../organizations/OrganizationFilter';
import { Container, Row } from 'react-bootstrap';


const OrganizationsPage = () => {
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