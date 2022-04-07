import actions from './action';

const initState = {
    loading: {
        loadingOrderDetail: false,
    },
    data: {
        orderDetail: [],
    },
};

const OrderReducer = (state = initState, action) => {
    switch (action.type) {
        // normal login
        case actions.LOAD_ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingOrderDetail: false,
                },
                data: {
                    ...state.data,
                    orderDetail: action.data,
                },
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

export default OrderReducer;
