import React, { Fragment, useContext, useEffect } from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationFilter from '../organizations/OrganizationFilter';
import OrganizationButton from '../organizations/OrganizationButton';
import ContactContext from '../../context/contact/contactContext';
import CurrentOrgSearch from '../organizations/CurrentOrgSearch';
import Contacts from '../contacts/Contacts';
import AuthContext from '../../context/auth/authContext';
import { Container, Row } from 'react-bootstrap';
import { CLEAR_CONTACT_FILTER } from '../../context/types';


const OrganizationsPage = () => {

    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { filtered, clearContactFilter } = contactContext;

    useEffect(() => {
        authContext.loadUser();
        clearContactFilter();
        //eslint-disable-next-line
    }, [])

    return (
        <Container>
            <Row>


                {filtered ? <CurrentOrgSearch /> : <OrganizationFilter />}
                <OrganizationButton />


            </Row>
            <Row >
                <Organizations />
            </Row>
            {/* {filtered !== null &&

                <Row>
                    <Contacts />
                </Row>

            } */}


        </Container>


    )
}

export default OrganizationsPage;