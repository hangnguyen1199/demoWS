import actions from './action';
import actionsUser from './../user-logged/action';

const initState = {
    data: {
        UserProfile: {},
        User: {}
    },
};

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    UserProfile: action.data,
                },
            };
        case actions.GET_USER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    User: action.data,
                },
            };
        case actionsUser.UPDATE_AVATAR_SUCCESS:
            return{
                ...state,
                data: {
                    ...state.data,
                    User:{
                        ...state.data.User,
                        Avatar:action.data
                    }
                },
            }
        default:
            return {
                ...state,
            };
    }
};

export default AuthReducer;
