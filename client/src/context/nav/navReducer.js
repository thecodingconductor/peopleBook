import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../types';

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