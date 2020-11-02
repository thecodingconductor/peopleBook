import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
import UrgentItem from '../urgent/UrgentItem';

const UrgentList = () => {

    const contactContext = useContext(ContactContext);

    const { urgent } = contactContext;

    if (urgent.length === 0) {
        return <h4>Please Add Urgent Contacts</h4>
    }

    return (
        <Fragment>
            {urgent.map(contact => (
                <UrgentItem key={contact.id} contact={contact}></UrgentItem>
            ))}
        </Fragment>
    )
}

export default UrgentList;