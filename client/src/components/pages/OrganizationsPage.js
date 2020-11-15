import React, { Fragment, useContext, useEffect } from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationFilter from '../organizations/OrganizationFilter';
import OrganizationButton from '../organizations/OrganizationButton';
import OrganizationContext from '../../context/organization/organizationContext';
import ContactContext from '../../context/contact/contactContext';
import CurrentOrgSearch from '../organizations/CurrentOrgSearch';
import Contacts from '../contacts/Contacts';
import AuthContext from '../../context/auth/authContext';
import NavContext from '../../context/nav/navContext';
import Spinner from '../layout/Spinner';
import { Container, Row } from 'react-bootstrap';


const OrganizationsPage = () => {

    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const organizationContext = useContext(OrganizationContext);
    const navContext = useContext(NavContext);

    const { filtered, clearContactFilter } = contactContext;
    const { current } = organizationContext;
    const { showModal, showModalFunc, hideModalFunc } = navContext;
    const { loadUser, user, loading } = authContext;

    useEffect(() => {
        loadUser();
        clearContactFilter();
        if (showModal) {
            hideModalFunc();
        }
        //eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <Container fluid className="organizations-page-main">

                <div className="d-flex justify-content-start align-items-center welcome-message-container">
                    <h5>Organizations</h5>
                </div>
                {current !== null && <OrganizationButton />}
                <div className="d-flex justify-content-start align-items-center search-field-container">
                    {filtered ? <CurrentOrgSearch /> : <OrganizationFilter />}
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center all-orgs-container">
                    {user !== null && !loading ? <Organizations /> : <Spinner />}
                </div>
            </Container>


        </Fragment>



    )
}

export default OrganizationsPage;