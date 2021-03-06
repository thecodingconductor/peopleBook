import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducter from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    ADD_TO_VIPS,
    REMOVE_VIP,
    ADD_TO_URGENT,
    ADD_TO_URGENT_ERROR,
    REMOVE_URGENT,
    REMOVE_URGENT_ERROR,
    CLEAR_VIP,
    CLEAR_URGENT_ITEM,
    GET_VIPS
} from '../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducter, initialState);

    //Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({ type: AUTH_ERROR })
        }
    }

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    //Log In User
    const login = async formData => {

        

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }

        }

        try {
            const res = await axios.post('api/auth', formData, config);
     
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    //Log Out User 
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    };

    //Clear Errors 
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS })
    }


    //Add to contacts to user's VIP list
    const addToVIPS = async (contact, userID) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };



        try {
            const res = await axios.put(`api/users/${userID}/vips`, contact, config)



            dispatch({
                type: ADD_TO_VIPS,
                payload: res.data
            })
        } catch (error) {
            console.error(error.message);
        }
    };



    // Remove contact from VIPS
    const removeFromVIPS = async (contact, userID) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {

            const res = await axios.put(`api/users/${userID}/vips/remove`, contact, config);

            dispatch({
                type: REMOVE_VIP,
                payload: contact
            })
        } catch (error) {
            console.error(error);
            
        }
    }

    const getVIPS = async () => {

        console.log('get vips?');
        dispatch({
            type: GET_VIPS
        })
    }

    // Add contact to Urgent List.
    const addToUrgent = async (contact, userID) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

       

        try {
            const res = await axios.put(`api/users/${userID}/urgent`, contact, config);



            dispatch({
                type: ADD_TO_URGENT,
                payload: contact
            })

        } catch (error) {
            dispatch({
                type: ADD_TO_URGENT_ERROR,
                payload: error.response.data.message
            })
        }
    }

    // Remove from ToDoList
    const removeFromToDoList = async (contact, userID) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {

            await axios.put(`api/users/${userID}/urgent/remove`, contact, config);


            dispatch({
                type: REMOVE_URGENT,
                payload: contact
            })
        } catch (error) {
            dispatch({
                type: REMOVE_URGENT_ERROR,
                payload: error.response.data.message
            })
        }
    }

    //Clear removed VIP
    const clearVIP = () => {
        dispatch({ type: CLEAR_VIP })
    }

    //Clear removed Urgent Item
    const clearUrgentItem = () => {
        dispatch({ type: CLEAR_URGENT_ITEM })
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            addToVIPS,
            removeFromVIPS,
            getVIPS,
            addToUrgent,
            removeFromToDoList,
            clearVIP,
            clearUrgentItem,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )




}

export default AuthState;