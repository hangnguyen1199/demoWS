import actions from "./action";

const initState = {
    loading: false,
    pointHistories: [],
    vouchers: [],
    pointHistoryDetail: {},
};

const WalletReducer = (state = initState, action) => {
    switch (action.type) {
    //----------------------------------------------
    // LOAD_POINT_HISTORY
    //----------------------------------------------
        case actions.LOAD_POINT_HISTORY:
            return {
                ...initState,
                loading: true,
            };

        case actions.LOAD_POINT_HISTORY_SUCCESS:
            return {
                ...state,
                pointHistories: action.payload.PointHistories,
                loading: false,
            };

        case actions.LOAD_POINT_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
            };
            //----------------------------------------------
            // LOAD_VOUCHER
            //----------------------------------------------
        case actions.LOAD_VOUCHER:
            return {
                ...initState,
                loading: true,
            };

        case actions.LOAD_VOUCHER_SUCCESS:
            return {
                ...state,
                vouchers: action.payload.Vouchers,
                loading: false,
            };

        case actions.LOAD_VOUCHER_FAILURE:
            return {
                ...state,
                loading: false,
            };
            //----------------------------------------------
            // LOAD_POINT_HISTORY
            //----------------------------------------------
        case actions.LOAD_POINT_HISTORY_DETAIL:
            return {
                ...state,
                loading: true,
            };

        case actions.LOAD_POINT_HISTORY_DETAIL_SUCCESS:
            return {
                ...state,
                pointHistoryDetail: action.payload,
                loading: false,
            };

        case actions.LOAD_POINT_HISTORY_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
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

export default WalletReducer;
