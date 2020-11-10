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
    ADD_VIPS_ERROR
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
    const addToVIPS = async contact => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const res = await axios.post('/api/contacts', contact, config)

            dispatch({
                type: ADD_TO_VIPS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: ADD_VIPS_ERROR,
                payload: error.response.msg
            });

        }
    };

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            { props.children}
        </AuthContext.Provider>
    )


}

export default AuthState;