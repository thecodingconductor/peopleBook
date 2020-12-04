import {
    ADD_CONTACT,
    CREATE_NEW_CONTACT,
    CREATE_NEW_CONTACT_ERROR,
    SET_CURRENT,
    ADD_CONTACT_FAIL,
    CONTACT_ERROR,

    FILTER_CONTACTS,
    FILTER_FILTERED_CONTACTS,
    CLEAR_CONTACT_FILTER,
    CLEAR_FILTERED_BY_ORG,
    CONTACTS_BY_ORG,

    GET_CONTACTS,
    GET_URGENT,
    GET_VIPS,
    CLEAR_CURRENT
} from '../types';

export default (state, action) => {
    switch (action.type) {

        case CREATE_NEW_CONTACT:

            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }

        case SET_CURRENT:
            console.log(`SET CURRENT -> ${action.payload}`);
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.position.match(regex) || contact.organization.match(regex);
                })
            }
        case FILTER_FILTERED_CONTACTS:
            return {
                ...state,
                filteredByOrg: state.filtered.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.position.match(regex);
                })
            }
        case CLEAR_FILTERED_BY_ORG:
            return {
                ...state,
                filteredByOrg: null
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