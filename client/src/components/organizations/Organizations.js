import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OrganizationItem from './OrganizationItem';
import OrganizationContext from '../../context/organization/organizationContext';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from '../../components/contacts/ContactItem';
import ContactsByOrg from '../../components/contacts/ContactsByOrg';
import Contacts from '../contacts/Contacts';
import OrganizationButton from './OrganizationButton';
import Spinner from '../layout/Spinner';

const Organizations = () => {
    const organizationContext = useContext(OrganizationContext);
    const contactContext = useContext(ContactContext);

    const { organizations, current, filtered, getOrganizations, filterOrganizations } = organizationContext;
    const { filterContacts, filtered: filteredContacts, getContacts } = contactContext;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


    useEffect(() => {
        getOrganizations();
        getContacts();
        // eslint-disable-next-line
    }, [])


    if (organizations === null || organizations.length === 0) {
        return <Spinner />
    } else if (current !== null) {

        return (


            <Fragment>
                <OrganizationItem organization={current} />
                <Contacts />
            </Fragment>


        )
    }


    return (

        <Fragment>
            {filtered !== null ?
                filtered.map(organization => (<OrganizationItem key={organization._id} organization={organization} />)) :
                organizations.map(organization => (<OrganizationItem key={organization._id} organization={organization} />))

            }
        </Fragment>
    )
}

export default Organizations;