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
    ORG_GET_FAIL,
    FILTER_ORGS,
    CLEAR_ORG_FILTER,
} from '../types';

const OrganizationState = props => {
    const initialState = {
        organizations: [],
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

    //Get All Organizations
    const getOrganizations = async () => {
        try {
            const res = await axios.get('/api/organizations');

            dispatch({
                type: GET_ORGS,
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: ORG_GET_FAIL,
                payload: err.response.msg
            })
        }
    }

    //Delete Org

    //Set Current Org
    const setCurrent = org => {
        dispatch({ type: SET_CURRENT_ORG, payload: org })
    }

    //Clear Current
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT_ORG })
    }
    //Update Org

    //Filter Orgs
    const filterOrganizations = text => {
        dispatch({ type: FILTER_ORGS, payload: text })
    }

    //Contacts by Org Name 
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
                addOrgs,
                getOrganizations,
                setCurrent,
                clearCurrent
            }}>
            {props.children}
        </OrganizationContext.Provider>
    )

}

export default OrganizationState;