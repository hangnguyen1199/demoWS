const AppActions = {
    SHOW_LOADING: "SHOW_LOADING",

    CALL_LOADER: 'CALL_LOADER',
    CLOSE_LOADER: 'CLOSE_LOADER',

    CALL_LOADING: 'CALL_LOADING',
    CLOSE_LOADING: 'CLOSE_LOADING',

    OPEN_ALERT: 'OPEN_ALERT',
    CLOSE_ALERT: 'CLOSE_ALERT',

    OPEN_OVERLAY: 'OPEN_OVERLAY',
    CLOSE_OVERLAY: 'CLOSE_OVERLAY',

    CHECK_ACCOUNT_AUTHENTICATION: 'CHECK_ACCOUNT_AUTHENTICATION',
    CHECKING_ACCOUNT_AUTHENTICATION: 'CHECKING_ACCOUNT_AUTHENTICATION',
    CHECK_ACCOUNT_AUTHENTICATION_SUCCESS:
        'CHECK_ACCOUNT_AUTHENTICATION_SUCCESS',
    CHECK_ACCOUNT_AUTHENTICATION_FAILURE:
        'CHECK_ACCOUNT_AUTHENTICATION_FAILURE',

    TOGGLE_SEARCH_SHOP: 'TOGGLE_SEARCH_SHOP',

    TOGGLE_MODAL_BRAND_MULTI: 'TOGGLE_MODAL_BRAND_MULTI',
    TOGGLE_MODAL_REGULATION: 'TOGGLE_MODAL_REGULATION',
    
    TOGGLE_CHANGE_TYPE_DISPLAY: 'TOGGLE_CHANGE_TYPE_DISPLAY', //HAIDT
    CHANGE_TYPE_SIGN_IN_SIGN_UP: 'CHANGE_TYPE_SIGN_IN_SIGN_UP', // HAIDT
    TOGGLE_MENU_FOOTER_MOBILE: 'TOGGLE_MENU_FOOTER_MOBILE', // HAIDT
    TOGGLE_SHOW_CART_TOP: 'TOGGLE_SHOW_CART_TOP', // HAIDT
    TOGGLE_SUB_MENU_GENDER: 'TOGGLE_SUB_MENU_GENDER', // HAIDT
    openOverlay: () => ({
        type: AppActions.OPEN_OVERLAY,
    }),
    closeOverlay: () => ({
        type: AppActions.CLOSE_OVERLAY,
    }),
    callLoading: () => ({
        type: AppActions.CALL_LOADING,
    }),
    closeLoading: () => ({
        type: AppActions.CLOSE_LOADING,
    }),

    callLoader: () => ({
        type: AppActions.CALL_LOADER,
    }),
    closeLoader: () => ({
        type: AppActions.CLOSE_LOADER,
    }),

    openAlert: (data) => ({
        type: AppActions.OPEN_ALERT,
        data,
    }),
    closeAlert: () => ({
        type: AppActions.CLOSE_ALERT,
    }),
};

export default AppActions;