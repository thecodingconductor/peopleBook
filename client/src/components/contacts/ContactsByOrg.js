import React, { Fragment, useEffect, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';
import OrganizationContext from '../../context/organization/organizationContext';


const ContactsByOrg = () => {

    const contactContext = useContext(ContactContext);
    const organizationContext = useContext(OrganizationContext);

    const { contacts, filtered, getContacts, filterContacts } = contactContext;




    return (
        <Fragment>
            {filtered !== null ?
                filtered.map(contact => (<ContactItem key={contact._id} contact={contact} />)) :
                <h4>Search Error</h4>}
        </Fragment>
    )
}

export default ContactsByOrg;
