import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    CONTACT_ERROR,
    ADD_CONTACT,
    CREATE_NEW_CONTACT,
    CREATE_NEW_CONTACT_ERROR,
    SET_CURRENT,


    FILTER_CONTACTS,
    FILTER_FILTERED_CONTACTS,
    CLEAR_FILTERED_BY_ORG,

    CLEAR_CONTACTS,
    CLEAR_CONTACT_FILTER,
    CLEAR_CURRENT,
    GET_URGENT,
    GET_VIPS
} from '../types';

const ContactState = props => {

    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        filteredByOrg: null,
        urgent: [],
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

    // Create new contact
    const createNewContact = async (contact, addToVIP) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/contacts/newcontact', contact, config)



            dispatch({
                type: CREATE_NEW_CONTACT,
                payload: res.data
            });

            if (addToVIP) {
                console.log('set current dispatcher');
                dispatch({
                    type: SET_CURRENT,
                    payload: res.data
                })
            }




        } catch (err) {
            console.error(err);
            dispatch({
                CREATE_NEW_CONTACT_ERROR,
                payload: err.response.msg
            })

        }
    }



    //Filter Contacts
    const filterContacts = text => {
        
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

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
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
            getUrgent,
            createNewContact,
            clearCurrent
        }}>
            { props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;