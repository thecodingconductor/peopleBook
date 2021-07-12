import React, { Fragment, useContext, useEffect } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';


const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered, filteredByOrg, getContacts } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, [])

    //add loading, and all alert state things.
    if (contacts !== null && contacts.length === 0) {
        return <p className="text-muted text-secondary">Please add contacts</p>
    }


    return (


        <Fragment>
            {/* If filtered by name, filter by name, else filter by organization */}
            {filtered !== null && filteredByOrg === null ?
                filtered.map(contact => (<ContactItem key={contact._id} contact={contact} />)) :
                filteredByOrg.map(contact => (
                    <ContactItem key={contact._id} contact={contact}></ContactItem>
                ))}
        </Fragment>
    )
}

export default Contacts;