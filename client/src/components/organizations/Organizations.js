import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OrganizationItem from './OrganizationItem';
import OrganizationContext from '../../context/organization/organizationContext';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from '../../components/contacts/ContactItem';
import ContactsByOrg from '../../components/contacts/ContactsByOrg';

const Organizations = () => {
    const organizationContext = useContext(OrganizationContext);
    const contactContext = useContext(ContactContext);

    const { organizations, current, filtered, getOrganizations, filterOrganizations } = organizationContext;
    const { filterContacts, filtered: filteredContacts } = contactContext;



    useEffect(() => {
        getOrganizations();
        // eslint-disable-next-line
    }, [])


    if (organizations === null || organizations.length === 0) {
        return <h4>Please add some Organizations</h4>
    } else if (current !== null) {

        // filterContacts(current.name);

        return (


            <Fragment>
                <OrganizationItem organization={current} />
            </Fragment>


        )
    }


    return (

        <Fragment>
            {filtered !== null ?
                filtered.map(organization => (<OrganizationItem key={organization._id} organization={organization} />)) :
                organizations.map(organization => (<OrganizationItem key={organization._id} organization={organization} />))}
        </Fragment>
    )
}

export default Organizations;