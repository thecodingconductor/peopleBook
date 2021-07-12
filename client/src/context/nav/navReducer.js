import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../types';

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true
            }
        case HIDE_MODAL:
            return {
                ...state,
                showModal: false
            }
        default:
            return state
    }
}