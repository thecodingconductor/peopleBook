import {
    ADD_CONTACT,
    ADD_CONTACT_FAIL,
    CONTACT_ERROR,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACT_FILTER,
    CONTACTS_BY_ORG,
    CONTACTS_BY_ORG_ERROR,
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

        case CONTACTS_BY_ORG:
            return {
                ...state,

            }
        case CLEAR_CONTACT_FILTER:
            return {
                ...state,
                filtered: null
            }

        case ADD_CONTACT:
            return {
                ...state,
                vips: [action.payload, ...state.vips]
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

        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
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