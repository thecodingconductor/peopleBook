import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import Form from 'react-bootstrap/Form';

const ContactFilter = () => {

    const contactContext = useContext(ContactContext);
    //CLEAR FILTER TODO
    const { filterContacts, clearContactFilter, filtered } = contactContext;
    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    })

    const onChange = e => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {

            clearContactFilter();
        }
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Search Contacts By Name, Organization, or Position</Form.Label>
                <Form.Control size="lg" type="text" ref={text} placeholder="Filter Contacts by Name" onChange={onChange}></Form.Control>
            </Form.Group>
        </Form>
    )
}

export default ContactFilter;