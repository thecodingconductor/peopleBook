import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    CONTACT_ERROR,
    ADD_CONTACT,
    CONTACTS_BY_ORG,
    CONTACTS_BY_ORG_ERROR,
    DELETE_CONTACT,
    SET_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    FILTER_FILTERED_CONTACTS,
    CLEAR_FILTERED_BY_ORG,
    ADD_CONTACT_FAIL,
    CLEAR_CONTACTS,
    CLEAR_CONTACT_FILTER,
    GET_URGENT,
    GET_VIPS,
    ADD_TO_VIPS
} from '../types';

const ContactState = props => {

    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        filteredByOrg: null,
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

    //Contacts by current organization
    // const contactsByOrg = async orgName => {
    //     const res = await axios.get('api/contacts');
    //     try {
    //         dispatch({
    //             type: CONTACTS_BY_ORG,
    //             payload: res.data
    //         })
    //     } catch (error) {
    //         dispatch({
    //             type: CONTACTS_BY_ORG_ERROR,
    //             payload: error.response.msg
    //         })
    //     }
    // }



    //Filter Contacts
    const filterContacts = text => {
        // console.log(text);
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    const filterFilteredContacts = text => {
        dispatch({
            type: FILTER_FILTERED_CONTACTS,
            payload: text
        })
    }

    const clearFilteredByOrg = () => {
        dispatch({ type: CLEAR_FILTERED_BY_ORG })
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
            filteredByOrg: state.filteredByOrg,
            urgent: state.urgent,
            getContacts,
            addAllContacts,
            filterContacts,
            filterFilteredContacts,
            clearFilteredByOrg,
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