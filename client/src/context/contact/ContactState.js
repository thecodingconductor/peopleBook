import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {

    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Deborah Borda",
                organization: "New York Philharmonic",
                position: "Executive Director",
                email: "bordad@nyphil.org",
                phone: "111-111-1111",
                lastContacted: null,
                needToContact: false,
                notes: null

            },
            {
                id: 2,
                name: "Deborah Borda",
                organization: "New York Philharmonic",
                position: "Executive Director",
                email: "bordad@nyphil.org",
                phone: "111-111-1111",
                lastContacted: null,
                needToContact: true,
                notes: null

            },
            {
                id: 3,
                name: "Deborah Borda",
                organization: "New York Philharmonic",
                position: "Executive Director",
                email: "bordad@nyphil.org",
                phone: "111-111-1111",
                lastContacted: null,
                needToContact: false,
                notes: null

            },
        ],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Get all contacts
    // const getContacts = contacts => {
    //     dispatch({
    //         type: GET_CONTACTS,
    //         payload: contacts
    //     })
    // }

    //Add a Contact
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact })
    }


    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            // getContacts
        }}>
            { props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;