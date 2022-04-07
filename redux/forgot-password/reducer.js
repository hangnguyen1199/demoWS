import actions from './action';
import { submit } from 'redux-form';

const initState = {
    loading: false,
    status: null,
    errorElement: '',
    error: '',
    submit: null,
};

const ManagementReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.SUBMITING_SIGN_UP:
            return {
                ...state,
                loading: true,
                submit: null,
            };
        case actions.SUBMIT_SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                status: 200,
                error: null,
                submit: true,
            };
        case actions.SUBMIT_SIGN_UP_FAILURE:
            return {
                ...state,
                loading: false,
                status: action.error.status,
                error: action.error,
                submit: false,
            };
        //----------------------------------------------
        // RESET_SIGN_UP
        //----------------------------------------------
        case actions.RESET_SIGN_UP:
            return {
                ...initState,
            };
        //----------------------------------------------
        // DEFAULT
        //----------------------------------------------
        default:
            return {
                ...state,
            };
    }
};

export default ManagementReducer;
