import React, { useReducer } from 'react';
import NavContext from './navContext';
import navReducer from './navReducer';
import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../types';

const NavState = props => {

    const initialState = {
        showModal: false
    }


    const [state, dispatch] = useReducer(navReducer, initialState);

    //SHOW MODAL
    const showModalFunc = () => {
        dispatch({ type: SHOW_MODAL })
    }


    //HIDE MODAL
    const hideModalFunc = () => {
        dispatch({ type: HIDE_MODAL })
    }





    return (
        <NavContext.Provider value={{
            showModal: state.showModal,
            showModalFunc,
            hideModalFunc
        }}>
            {props.children}
        </NavContext.Provider>
    )
}

export default NavState;
