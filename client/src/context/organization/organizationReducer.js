import {
    GET_ORGS,
    ADD_ORG,
    ORG_ADD_FAIL,
    DELETE_ORG,
    SET_CURRENT_ORG,
    CLEAR_CURRENT_ORG,
    UPDATE_ORG,
    FILTER_ORGS,
    CLEAR_ORG_FILTER
} from '../types';


export default (state, action) => {
    switch (action.type) {

        case ADD_ORG:
            return {
                ...state,
                organizations: [action.payload, ...state.contacts]
            }
        case ORG_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case FILTER_ORGS:
            return {
                ...state,
                filtered: state.organizations.filter(organization => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return organization.name.match(regex) || organization.category.match(regex)
                })
            }
        case CLEAR_ORG_FILTER:
            return {
                ...state,
                filtered: null
            }
        default:
            return state
    }
}