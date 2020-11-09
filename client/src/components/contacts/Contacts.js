import React, { Fragment, useContext, useEffect } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';


const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, [])

    //add loading, and all alert state things.
    if (contacts !== null && contacts.length === 0) {
        return <h4>Please add contacts</h4>
    }

    // if (contacts.length === 0) {
    //     return <h4>Please add a contact</h4>
    // }

    console.log(contacts);

    return (
        // <Fragment>
        //     <h1>Testing</h1>
        //     </Fragment>
        <Fragment>
            {filtered !== null ?
                filtered.map(contact => (<ContactItem key={contact._id} contact={contact} />)) :
                contacts.slice(0,10).map(contact => (
                    <ContactItem key={contact._id} contact={contact}></ContactItem>
                ))}
        </Fragment>
    )
}

export default Contacts;