import actions from './action';
import Cookies from 'js-cookie';
import axios from 'axios';
import AppConfig from './../../shared/config/AppConfig';

const initState = {
    loading: {
        loadingUserInfo: false,
        loadingOrders: false,
        loadingAddresses: false,
        loadingAddAddress: false,
        loadingDeleteAddress: false,
        loadingChangePassword: false,
        loadingChangeAvatar: false,
        loadingUpdateUser: false,
        loadingUpdateDefaultAddress: false,
        loadingGetAddressDetail: false,
    },
    data: {
        user_info: {
            user_id: '',
            user_name: '',
            avatar: '',
            birthday: null,
            gender: '',
            phone_country_code: '',
            phone: '',
            facebook: '',
            email: '',
            height: '',
            weight: '',
            address: [],
            shop_id: '',
            shop_name: '',
            shop_avatar: '',
            shop_background: '',
            shop_owner: '',
            shop_phone: '',
            shop_email: '',
            shop_facebook: '',
            ranking_shop: '',
            activated: '',
            shop_introduction: '',
        },
        orders: [],
        addresses: [],
        address_detail: {},
        qrData: '  ',
    },
    submit: {
        addAddress: null,
        removeAddress: null,
        updateAddress: null,
        changePassword: null,
        changeAvatar: null,
        updateUser: null,
        updateDefaultAddress: null,
        getAddressDetail: null,
    },
    total: { orders: 0 },
    offset: { orders: 0 },
    limit: { orders: 0 },
};

const UserLoggedReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.LOAD_USER_LOGGED_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingUserInfo: false,
                },
                data: action.data,
            };
        case actions.AUTH_ME_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingUserInfo: false,
                },
                data: {
                    ...state.data,
                    user_info: action.data,
                },
            };

        case actions.LOGOUT:
            Cookies.remove('token');
            AppConfig.ACCESS_TOKEN = "";
            axios.defaults.headers.common = { Authorization: `Bearer ` };
            return {
                ...state,
                data: {
                    ...state.data,
                    user_info: {},
                },
            };
        //----------------------------------------------
        // UPDATE USER INFO
        //----------------------------------------------
        case actions.UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingUpdateUser: false,
                },
                submit: {
                    ...state.submit,
                    updateUser: true,
                },
            };
        case actions.UPDATING_USER_INFO:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingUpdateUser: true,
                },
                submit: {
                    ...state.submit,
                    updateUser: null,
                },
            };
        case actions.UPDATE_USER_INFO_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingUpdateUser: false,
                },
                submit: {
                    ...state.submit,
                    updateUser: false,
                },
            };
        //----------------------------------------------
        // UPDATE USER INFO
        //----------------------------------------------
        case actions.LOAD_USER_ORDER_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingOrders: false,
                },
                data: {
                    ...state.data,
                    orders: action.data.orders,
                },
                total: {
                    ...state.total,
                    orders: action.data.total,
                },
                limit: {
                    ...state.limit,
                    orders: action.data.limit,
                },
                offset: {
                    ...state.offset,
                    orders: action.data.offset,
                },
            };
        case actions.LOADING_USER_ORDER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingOrders: true,
                },
            };
        case actions.LOAD_USER_ORDER_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingOrders: false,
                },
            };

        //----------------------------------------------
        // LOAD ADDRESS
        //----------------------------------------------
        case actions.LOAD_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingAddresses: false,
                },
                data: {
                    ...state.data,
                    addresses: action.data,
                },
            };
        case actions.LOADING_USER_ADDRESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingAddresses: true,
                },
            };
        case actions.LOAD_USER_ADDRESS_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingAddresses: false,
                },
            };
        //----------------------------------------------
        // ADD ADDRESS
        //----------------------------------------------
        case actions.ADD_ORDER_ADDRESS_SUCCESS:
            state.data.addresses.push(action.data);
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingAddAddress: false,
                },
                data: {
                    ...state.data,
                },
                submit: {
                    ...state.submit,
                    addAddress: true,
                },
            };
        case actions.ADDING_ORDER_ADDRESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingAddAddress: true,
                },
                submit: {
                    ...state.submit,
                    addAddress: null,
                },
            };
        case actions.ADD_ORDER_ADDRESS_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingAddAddress: false,
                },
                submit: {
                    ...state.submit,
                    addAddress: false,
                },
            };
        //----------------------------------------------
        // DELETE ADDRESS
        //----------------------------------------------
        case actions.REMOVE_ITEM_ADDRESS_ORDER_SUCCESS:
            {
                let index = state.data.addresses.findIndex(
                    (x) => x.user_address_id == action.data,
                );
                state.data.addresses.splice(index, 1);
            }
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingDeleteAddress: false,
                },
                submit: {
                    ...state.submit,
                    removeAddress: true,
                },
                data: {
                    ...state.data,
                },
            };
        case actions.REMOVING_ITEM_ADDRESS_ORDER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingDeleteAddress: true,
                },
                submit: {
                    ...state.submit,
                    removeAddress: null,
                },
            };
        case actions.REMOVE_ITEM_ADDRESS_ORDER_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingDeleteAddress: false,
                },
                submit: {
                    ...state.submit,
                    removeAddress: false,
                },
            };
        //----------------------------------------------
        // UPDATE ADDRESS
        //----------------------------------------------
        case actions.UPDATE_ORDER_ADDRESS_SUCCESS:
            let index = state.data.addresses.findIndex(
                (x) => x.user_address_id == action.oldId,
            );
            if (index != -1) {
                state.data.addresses[index] = action.data;
            }

            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingAddAddress: false,
                },
                data: {
                    ...state.data,
                },
                submit: {
                    ...state.submit,
                    addAddress: true,
                },
            };
        case actions.UPDATING_ORDER_ADDRESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingAddAddress: true,
                },
                submit: {
                    ...state.submit,
                    addAddress: null,
                },
            };
        case actions.UPDATE_ORDER_ADDRESS_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingAddAddress: false,
                },
                submit: {
                    ...state.submit,
                    addAddress: false,
                },
            };
        //----------------------------------------------
        // CHANGE PASSWORD
        //----------------------------------------------
        case actions.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingChangePassword: false,
                },
                submit: {
                    ...state.submit,
                    changePassword: true,
                },
            };
        case actions.CHANGING_PASSWORD:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingChangePassword: true,
                },
                submit: {
                    ...state.submit,
                    changePassword: null,
                },
            };
        case actions.CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingChangePassword: false,
                },
                submit: {
                    ...state.submit,
                    changePassword: false,
                },
            };
        //----------------------------------------------
        // CHANGE PASSWORD
        //----------------------------------------------
        case actions.UPDATE_AVATAR_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingChangeAvatar: false,
                },
                submit: {
                    ...state.submit,
                    changeAvatar: true,
                },data:{
                    ...state.data,
                    user_info:{
                        ...state.data.user_info,
                        avatar:action.data
                    }
                }
            };
        case actions.UPDATING_AVATAR:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingChangeAvatar: true,
                },
                submit: {
                    ...state.submit,
                    changeAvatar: null,
                },
            };
        case actions.UPDATE_AVATAR_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingChangeAvatar: false,
                },
                submit: {
                    ...state.submit,
                    changeAvatar: false,
                },
            };
        //----------------------------------------------
        // UPDATE ADDRESS
        //----------------------------------------------
        case actions.UPDATE_DEFAULT_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingUpdateDefaultAddress: false,
                },
                submit: {
                    ...state.submit,
                    updateDefaultAddress: true,
                },
            };
        case actions.UPDATING_DEFAULT_ADDRESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingUpdateDefaultAddress: true,
                },
                submit: {
                    ...state.submit,
                    updateDefaultAddress: null,
                },
            };
        case actions.UPDATE_DEFAULT_ADDRESS_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingUpdateDefaultAddress: false,
                },
                submit: {
                    ...state.submit,
                    updateDefaultAddress: false,
                },
            };

        //----------------------------------------------
        // GET ADDRESS DETAIL
        //----------------------------------------------
        case actions.GET_USER_ADDRESS_DETAIL_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingGetAddressDetail: false,
                },
                data: {
                    ...state.data,
                    address_detail: action.data,
                },
                submit: {
                    ...state.submit,
                    getAddressDetail: true,
                },
            };
        case actions.GETTING_USER_ADDRESS_DETAIL:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingGetAddressDetail: true,
                },

                submit: {
                    ...state.submit,
                    getAddressDetail: null,
                },
            };
        case actions.GET_USER_ADDRESS_DETAIL_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingGetAddressDetail: false,
                },
                submit: {
                    ...state.submit,
                    getAddressDetail: false,
                },
            };
        //----------------------------------------------
        // CLEAR USER ADDRESS DETAIL
        //----------------------------------------------
        case actions.CLEAR_USER_ADDRESS_DETAIL:
            return {
                ...state,
                data: {
                    ...state.data,
                    address_detail: null,
                },
            };
        //----------------------------------------------
        // RESET_USER_LOGGED
        //----------------------------------------------
        case actions.RESET_USER_LOGGED:
            return {
                ...state,
                submit: {},
            };
        //----------------------------------------------
        // QR DATA
        //----------------------------------------------
        case actions.GET_ORDER_QR_DATA_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    qrData: action.payload,
                },
            };
        case actions.GET_ORDER_QR_DATA_FAILURE:
            return {
                ...state,
                data: {
                    ...state.data,
                    qrData: null,
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

export default UserLoggedReducer;
