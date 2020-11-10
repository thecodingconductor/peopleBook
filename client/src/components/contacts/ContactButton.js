import React, { Fragment, useContext } from 'react';
import { Button } from 'react-bootstrap';
import ContactContext from '../../context/contact/contactContext';
const peopleData = require('../../people.json');

const ContactButton = props => {

    const contactContext = useContext(ContactContext);
    // const { addAllContacts } = contactContext;

    const onClick = e => {
        e.preventDefault();

        console.log(peopleData["people"].length);
        // for (let i = 10000; i < 15000; i++) {
        //     console.log(peopleData["people"][i]);
        //     addAllContacts(peopleData["people"][i]);
        // }

    }

    return (
        <Fragment>
            <Button onClick={onClick}>Add Contacts Data</Button>
        </Fragment>
    )
}

export default ContactButton