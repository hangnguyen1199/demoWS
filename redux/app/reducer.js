import actions from '@spo/redux/app/action';

const initState = {
    loader: false,
    loading: true,
    overlay: false,
    alert: false,
    typeDisplay: 5,
    signInSignUpType: 0,
    ativeMenuMobile: 1,
    isShowCartTop: false,
    data: {
    },
    isAccountAuthenticated: null,
};


const AppReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.SHOW_LOADING:
            return {
                ...state,
                loading: action.data,
            }
        case actions.CHANGE_TYPE_SIGN_IN_SIGN_UP:
            return {
                ...state,
                signInSignUpType: action.data,
            };
        case actions.TOGGLE_MENU_FOOTER_MOBILE:
            return {
                ...state,
                ativeMenuMobile: action.data,
            };
        case actions.TOGGLE_SHOW_CART_TOP:
            return {
                ...state,
                isShowCartTop: action.data,
            };
        case actions.CALL_LOADING:
            return {
                ...state,
                loading: true,
            };
        case actions.CLOSE_LOADING:
            return {
                ...state,
                loading: false,
            };
        //
        case actions.CALL_LOADER:
            return {
                ...state,
                loader: true,
            };
        case actions.CLOSE_LOADER:
            return {
                ...state,
                loader: false,
            };
        //
        case actions.OPEN_ALERT:
            return {
                ...state,
                alert: true,
                data: {
                    ...state.data,
                    alert: action.data,
                },
            };
        case actions.CLOSE_ALERT:
            return {
                ...state,
                alert: false,
            };
        //
        //
        case actions.OPEN_OVERLAY:
            return {
                ...state,
                overlay: true,
            };
        case actions.CLOSE_OVERLAY:
            return {
                ...state,
                overlay: false,
            };
        //
        case actions.TOGGLE_CHANGE_TYPE_DISPLAY:
            return {
                ...state,
                typeDisplay: action.data,
            };
        // Kiểm tra người dùng đã xác thực tài khoản
        case actions.CHECKING_ACCOUNT_AUTHENTICATION:
            return {
                ...state,
            };
        case actions.CHECK_ACCOUNT_AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAccountAuthenticated: action.isAccountAuthenticated,
            };
        case actions.CHECK_ACCOUNT_AUTHENTICATION_FAILURE:
            return {
                ...state,
            };

        default:
            return {
                ...state,
            };
    }
};

export default AppReducer;
