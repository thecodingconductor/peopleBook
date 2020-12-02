import React, { Fragment, useContext, useEffect } from 'react';
import OrganizationItem from './OrganizationItem';
import OrganizationContext from '../../context/organization/organizationContext';
import ContactContext from '../../context/contact/contactContext';

import Contacts from '../contacts/Contacts';

import Spinner from '../layout/Spinner';

const Organizations = () => {
    const organizationContext = useContext(OrganizationContext);
    const contactContext = useContext(ContactContext);

    const { organizations, current, filtered, getOrganizations } = organizationContext;
    const { filterContacts, filtered: filteredContacts, getContacts } = contactContext;



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
                <OrganizationItem organization={current} addClass={'primary-organization'} />
                <div className="d-flex justify-content-start align-items-center contacts-container">
                    <Contacts />
                </div>

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