import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import OrganizationContext from './organizationContext';
import organizationReducer from './organizationReducer';
import {
    GET_ORGS,
    ADD_ORG,
    DELETE_ORG,
    SET_CURRENT_ORG,
    CLEAR_CURRENT_ORG,
    UPDATE_ORG,
    ORG_ADD_FAIL,
    FILTER_ORGS,
    CLEAR_ORG_FILTER
} from '../types';

const OrganizationState = props => {
    const initialState = {
        organizations: null,
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(organizationReducer, initialState);

    //Add Organizations
    const addOrgs = async orgData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }




        const { name, website, group, address, phone } = orgData;

        const data = {
            name,
            website,
            group,
            address,
            phone
        }



        try {
            const res = await axios.post('api/organizations', data, config);

            dispatch({
                type: ADD_ORG,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ORG_ADD_FAIL,
                payload: err.response.data.msg
            })
        }
    }

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
                clearOrgFilter,
                addOrgs
            }}>
            {props.children}
        </OrganizationContext.Provider>
    )

}

export default OrganizationState;