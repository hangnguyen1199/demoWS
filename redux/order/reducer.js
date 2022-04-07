import actions from './action';

const initState = {
    loading: {
        loadingOrder: false
    },
    data: {
        userAddress: {},
        voucher: {},
        error: {},
        order: {
            RecieveAddressId: 0,
            BranchId: 0,
            ReciveTimeId: 2,
            ShipmentVoucherId: 0,
            NormalVoucher: 0,
            UseNormalPoint: 0,
            UseGoldPoint: 0,
            PaymentMethodId: 10,
            RequestFrom: 3,
            Note: '',
            Carts: []
        },
        orderValues: {
            OrderCode: '',
            OrderTotalAmount: 0,
            NormalPointAmount: 0,
            GoldPointAmount: 0,
            ShipmentFee: 0,
            VoucherShipmentAmount: 0,
            DiscountShipmentFee: 0,
            VoucherAmount: 0,
            ReduceFee: 0,
            PaymentTotalAmount: 0,
            RecievePoint: 0,
            UserNormalPoint: 0,
            UserGoldPoint: 0,
            ShipmentMethods: [],
            PaymentMethods: [],
            RecieveTimes: []
        }
    },
    detailAddressOrder:{},
    idAddressNew:''
};

const OrderReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.LOAD_USER_ORDER_ADDRESS_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    userAddress: action.userAddress ?? {},
                },
            };
        case actions.GET_ORDER_VOUCHER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    voucher: action.voucher ?? {},
                },
            };
        case actions.UPDATE_ORDER_VALUES:
            return {
                ...state,
                data: {
                    ...state.data,
                    order: action.order ?? {},
                },
            };
        case actions.CALC_ORDER_VALUES_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    orderValues: action.order ?? {},
                },
            };
        case actions.SET_ORDER_ERROR_MESSAGE:
            return {
                ...state,
                data: {
                    ...state.data,
                    error: action.error ?? {},
                },
            };
        case actions.SAVE_ORDER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingOrder: true,
                },
            };
        case actions.SAVE_ORDER_SUCCESS:
        case actions.SAVE_ORDER_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingOrder: false,
                },
            };
        case actions.SAVE_ORDER_SYNC_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingOrder: false,
                },
            };
        case actions.GET_ID_CREATE_ADDRESS_SUCCESS:
            return{
                ...state,
                idAddressNew: action.payload,
                detailAddressOrder:{}
            }
        case actions.DELETE_USER_ADDRESS_SUCCESS:

            let arrAddress=[...state.data.userAddress.UserAddresses];
            let index=arrAddress.findIndex(v=>v.UserAddressId == action.payload);
            if(index != -1){
                arrAddress.splice(index,1);
            }
            return{
                ...state,
                data:{
                    ...state.data,
                    userAddress:{
                        ...state.data.userAddress,
                        UserAddresses:arrAddress
                    }
                }
            }
        default:
            return {
                ...state,
            };
    }
};

export default OrderReducer;
