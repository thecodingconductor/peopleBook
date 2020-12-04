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
    ADD_VIPS_ERROR,
    GET_VIPS,
    ADD_TO_URGENT,
    ADD_TO_URGENT_ERROR,
    REMOVE_URGENT,
    REMOVE_URGENT_ERROR,
    REMOVE_VIP,
    REMOVE_VIP_ERROR,
    CLEAR_VIP,
    CLEAR_URGENT_ITEM
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:

            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }

        case ADD_TO_VIPS:

            return {
                ...state,
                user: {
                    ...state.user,
                    VIPS: [...state.user.VIPS]
                }
            }

        case REMOVE_VIP:
            return {
                ...state,
                user: {
                    ...state.user,
                    VIPS: state.user.VIPS.filter(vip => vip._id !== action.payload._id)
                }
            }

        case GET_VIPS: {
            return {
                ...state
            }
        }


        case ADD_TO_URGENT:
            return {
                ...state,
                user: {
                    ...state.user,
                    toDoList: [action.payload, ...state.user.toDoList]
                }

            }

        case REMOVE_URGENT:
            return {
                ...state,
                user: {
                    ...state.user,
                    toDoList: state.user.toDoList.filter(urgent => urgent._id !== action.payload._id),
                    needToContact: false
                }

            }

        case CLEAR_VIP:
            return {
                ...state,
                VIPS: [...state.user.VIPS]
            }
        case CLEAR_URGENT_ITEM:
            return {
                ...state,
                toDoList: [...state.user.toDoList]
            }

        case REMOVE_URGENT_ERROR:
        case REMOVE_VIP_ERROR:
            return {
                ...state
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:

            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }

        case ADD_VIPS_ERROR:
        case ADD_TO_URGENT_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}