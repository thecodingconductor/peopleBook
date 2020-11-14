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
        <Fragment>
            <Container fluid className="organizations-page-main">
                <div className="d-flex justify-content-start align-items-center welcome-message-container">
                    <h5>Organizations</h5>
                </div>
                <div className="d-flex justify-content-start align-items-center search-field-container">
                    {filtered ? <CurrentOrgSearch /> : <OrganizationFilter />}
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center all-orgs-container">
                    <Organizations />
                </div>
            </Container>


        </Fragment>



    )
}

export default OrganizationsPage;