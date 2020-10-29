import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import OrganizationContext from './organizationContext';
import organizationReducer from './organizationReducer';
import {
    GET_ORGS,
    ADD_ORG,
    DELETE_ORG,
    SET_CURRENT_ORG,
    CLEAR_CURRENT_ORG,
    UPDATE_ORG,
    FILTER_ORGS,
    CLEAR_ORG_FILTER
} from '../types';

const OrganizationState = props => {
    const initialState = {
        organizations: [
            {
                id: 1,
                name: "New York Philharmonic",
                website: "nyphil.org",
                category: "Group 1",
                phone: "111-111-1111",
                address: "NY,NY"
            },
            {
                id: 2,
                name: "Boston Symphony",
                website: "bostonsymphony.org",
                category: "Group 1",
                phone: "222-222-2222",
                address: "Boston,MA"
            },
            {
                id: 3,
                name: "Los Angeles Philharmonic",
                website: "laphil.org",
                category: "Group 1",
                phone: "111-111-1111",
                address: "LA, California"
            },
            {
                id: 4,
                name: "San Francisco Symphony",
                website: "sfsymphony.org",
                category: "Group 1",
                phone: "111-111-1111",
                address: "San Francisco,CA"
            },
        ],
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(organizationReducer, initialState);

    //Add Organization

    //Delete Org

    //Set Current Org

    //Clear Current

    //Update Org

    //Filter Orgs
    const filterOrganizations = text => {
        dispatch({ type: FILTER_ORGS, payload: text })
    }


    //Clear Org Filter
    const clearOrgFilter = () => {
        dispatch({ type: CLEAR_ORG_FILTER })
    }

    return (
        <OrganizationContext.Provider
            value={{
                organizations: state.organizations,
                current: state.current,
                filtered: state.filtered,
                filterOrganizations,
                clearOrgFilter

            }}>
            {props.children}
        </OrganizationContext.Provider>
    )

}

export default OrganizationState;