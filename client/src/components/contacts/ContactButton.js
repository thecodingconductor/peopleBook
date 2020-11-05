import React, { Fragment, useContext } from 'react';
import { Button } from 'react-bootstrap';
import ContactContext from '../../context/contact/contactContext';
const peopleData = require('../../people.json');

const ContactButton = props => {

    const contactContext = useContext(ContactContext);
    const { addAllContacts } = contactContext;

    const onClick = e => {
        e.preventDefault();
        console.log(peopleData["people"][0]);
        // peopleData["people"].forEach(person => {
        //     addAllContacts(person);
        // })
        for (let i = 0; i < 1000; i++) {
            addAllContacts(peopleData["people"][i]);
        }

    }

    return (
        <Fragment>
            <Button onClick={onClick}>Add Contacts Data</Button>
        </Fragment>
    )
}

export default ContactButton