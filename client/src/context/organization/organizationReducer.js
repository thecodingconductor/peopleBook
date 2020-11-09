import {
    GET_ORGS,
    ADD_ORG,
    ORG_ADD_FAIL,
    ORG_GET_FAIL,
    DELETE_ORG,
    SET_CURRENT_ORG,
    CLEAR_CURRENT_ORG,
    UPDATE_ORG,
    FILTER_ORGS,
    CLEAR_ORG_FILTER
} from '../types';


export default (state, action) => {
    switch (action.type) {

        case GET_ORGS:
            return {
                ...state,
                organizations: action.payload
            }

        case ORG_GET_FAIL:
            return {
                ...state,
                error: action.payload
            }
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
                    console.log(organization.name);
                    console.log(organization.group);
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    console.log(regex);
                    return organization.name.match(regex) || organization.group.match(regex);
                    // return organization.name.match(regex) || organization.category.match(regex)
                })
            }

        case SET_CURRENT_ORG:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_ORG_FILTER:
            return {
                ...state,
                filtered: null
            }
        case CLEAR_CURRENT_ORG:
            return {
                ...state,
                current: null
            }
        default:
            return state
    }
}