import Actions from './actions';

const initState = {
    orders: {
        Total: 0,
        Limit: 10,
        Offset: 0,
        Orders: [],
    },
    reviewDetail: {},
    orderDetail: {},
    cancelReason: [],
};
const Reducer = (state = initState, action) => {
    switch (action.type) {
        case Actions.GET_ORDER_BY_STATUS_RESPONSE:
            return {
                ...state,
                orders: action.payload,
            };
        case Actions.GET_REVIEW_DETAIL:
            return {
                ...state,
                reviewDetail: {},
            };
        case Actions.GET_REVIEW_DETAIL_RESPONSE:
            return {
                ...state,
                reviewDetail: action.payload,
            };
        case Actions.GET_ORDER_DETAIL_RESPONSE:
            return {
                ...state,
                orderDetail: action.payload,
            };
        case Actions.GET_CANCEL_REASON_RESPONSE:
            return {
                ...state,
                cancelReason: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};
export default Reducer;
