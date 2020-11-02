import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACT_FILTER,
    GET_CONTACTS
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
                contacts: [...state.contacts, action.payload]
            }
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }

        default:
            return state
    }
}