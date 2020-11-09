import React, { useContext, useEffect } from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationFilter from '../organizations/OrganizationFilter';
import OrganizationButton from '../organizations/OrganizationButton';
import ContactContext from '../../context/contact/contactContext';
import Contacts from '../contacts/Contacts';
import AuthContext from '../../context/auth/authContext';
import { Container, Row } from 'react-bootstrap';


const OrganizationsPage = () => {

    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { filtered } = contactContext;

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
            {/* {filtered !== null &&

                <Row>
                    <Contacts />
                </Row>

            } */}

            <Row>
                <OrganizationButton />
            </Row>
        </Container>


    )
}

export default OrganizationsPage;