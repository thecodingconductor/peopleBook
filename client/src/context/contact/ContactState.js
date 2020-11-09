import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    CONTACT_ERROR,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    ADD_CONTACT_FAIL,
    CLEAR_CONTACTS,
    CLEAR_CONTACT_FILTER,
    GET_URGENT,
    GET_VIPS
} from '../types';

const ContactState = props => {

    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        urgent: [

            {
                id: 3,
                name: "Russell Jones",
                organization: "New York Philharmonic",
                position: "Major Gifts",
                email: "bordad@nyphil.org",
                phone: "111-111-1111",
                lastContacted: null,
                needToContact: false,
                notes: null

            },

        ],
        vips: [
            {
                id: 4,
                name: "Franz Welser Most",
                organization: "Cleveland Orchestra",
                position: "Music Director",
                email: "bordad@nyphil.org",
                phone: "111-111-1111",
                lastContacted: null,
                needToContact: false,
                notes: null

            },
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get all contacts
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts');

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });

        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
            
        };

    }


    // Add all contacts
    const addAllContacts = async peopleData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }


        const { name, organization, position } = peopleData;

        const data = {
            name,
            organization,
            position
        }


        try {
            const res = await axios.post('api/contacts', data, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (err) {
            console.error(err.message);
        }


    }

    //Add a Contact
    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact })
    }

    //Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    //Clear Contact Filter
    const clearContactFilter = () => {
        dispatch({ type: CLEAR_CONTACT_FILTER })
    }

    //Get VIPS
    const getVIPS = () => {
        dispatch({ type: GET_VIPS })
    }

    //Get Urgent People
    const getUrgent = () => {
        dispatch({ type: GET_URGENT })
    }

    //Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            urgent: state.urgent,
            vips: state.vips,
            getContacts,
            addContact,
            addAllContacts,
            filterContacts,
            clearContactFilter,
            clearContacts,
            getVIPS,
            getUrgent
        }}>
            { props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;