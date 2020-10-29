import React, { Fragment, useContext } from 'react'
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';


const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts } = contactContext;

    if (contacts.length === 0) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            {contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact}></ContactItem>
            ))}
        </Fragment>
    )
}

export default Contacts;