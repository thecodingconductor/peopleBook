import {
    ADD_CONTACT,
    ADD_CONTACT_FAIL,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACT_FILTER,
    GET_CONTACTS,
    GET_URGENT,
    GET_VIPS
} from '../types';

export default (state, action) => {
    switch (action.type) {

        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.position.match(regex) || contact.organization.match(regex);
                })
            }
        case CLEAR_CONTACT_FILTER:
            return {
                ...state,
                filtered: null
            }

        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts,]
            }

        case ADD_CONTACT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }

        case GET_VIPS:
            return {
                ...state,
                vips: action.payload
            }
        case GET_URGENT:
            return {
                ...state,
                urgent: action.payload
            }

        default:
            return state
    }
}