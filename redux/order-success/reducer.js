import actions from './action';

const initState = {
    data: {
        delivery_name: "GHTK",
        full_address: "Phường Trúc Bạch, Quận Ba Đình, Hà Nội",
        order_code: "5YC52",
        payment_method_name: "Thanh toán sau",
        payment_method_type: "10",
        shipping_name: "nguyen  dung",
        shipping_phone: "0905577929"
    },
};

const OrderSuccessReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        default:
            return {
                ...state,
            };
    }
};

export default OrderSuccessReducer;
