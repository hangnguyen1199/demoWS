import actions from './action';
import Cookies from 'js-cookie';

const initState = {
    loading: {
        loadingCart: false,
        updatingCart: false,
        loadingRelativeProduct: false,
    },
    showPickStock: false,
    data: {
        cartProducts: [],
        checkedCart: [],
        currentItem: {},
        relativeProducts: [],
    },
};

const CartReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.LOAD_CART_SUCCESS:
            let newCart = [...action.products];
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCart: false,
                },
                data: {
                    ...state.data,
                    cartProducts: newCart ?? [],
                },
            };

        // case actions.LOADING_CART:
        // case actions.CREATE_TEMP_ORDER:
        //     return {
        //         ...state,
        //         loading: {
        //             ...state.loading,
        //             loadingCart: true,
        //         },
        //     };

        // case actions.CREATE_TEMP_ORDER_SUCCESS:
        // case actions.CREATE_TEMP_ORDER_FAILURE:
        //     return {
        //         ...state,
        //         loading: {
        //             ...state.loading,
        //             loadingCart: false,
        //         },
        //     };

        case actions.UPDATE_CHECKED_CART:
            let checkedCart = [...action.products];
            return {
                ...state,
                data: {
                    ...state.data,
                    checkedCart: checkedCart ?? [],
                },
            };
        //----------------------------------------------
        // RELATIVE PRODUCT
        //----------------------------------------------
        case actions.LOAD_RELATIVE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingRelativeProduct: false,
                },
                data: {
                    ...state.data,
                    relativeProducts: action.data.List,
                },
            };
        case actions.LOADING_RELATIVE_PRODUCT:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingRelativeProduct: true,
                },
            };
        case actions.LOAD_RELATIVE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingRelativeProduct: false,
                },
            };
        //---------------------------------------
        // Update cart
        //---------------------------------------
        case actions.UPDATING_CART:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    updatingCart: true,
                },
            };
        case actions.UPDATE_CART_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    updatingCart: false,
                },
            };
        case actions.UPDATE_CART_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    updatingCart: false,
                },
            };
        //---------------------------------------
        // Remove cart
        //---------------------------------------
        case actions.REMOVING_ITEM_CART:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    removingCart: true,
                },
            };
        case actions.REMOVE_ITEM_CART_SUCCESS:
            // eslint-disable-next-line no-case-declarations
            let newChecked = [...state.data.checkedCart];
            // eslint-disable-next-line no-case-declarations
            let indexRemoveItem = newChecked.findIndex(
                (x) => {
                    return x.ProductId == action?.payload?.item?.ProductId
                        && x.ColorId == action?.payload?.item?.ColorId
                        && x.SizeId == action?.payload?.item?.SizeId
                },
            );
            if (indexRemoveItem != -1) {
                newChecked.splice(indexRemoveItem, 1);
            }
            return {
                ...state,
                loading: {
                    ...state.loading,
                    updatingCart: false,
                },
                data: {
                    ...state.data,
                    cartProducts: [...state.data.cartProducts],
                    checkedCart: [...newChecked],
                },
            };
        case actions.REMOVE_ITEM_CART_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    removingCart: true,
                },
            };
        //---------------------------------------
        // add cart
        //---------------------------------------
        case actions.ADDING_CART:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCart: true,
                },
                data: {
                    ...state.data,
                },
            };
        case actions.ADD_CART_SUCCESS:
            return {
                ...state,
                loading: { ...state.loading, loadingCart: false },
            };
        case actions.ADD_CART_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCart: false,
                },
                data: {
                    ...state.data,
                },
            };
        case actions.ADD_CART_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, loadingCart: false },
            };
        //----------------------------------------------
        // LOAD_CURRENT_ITEM
        //----------------------------------------------
        // case actions.LOAD_CURRENT_ITEM:
        //     return {
        //         ...state,
        //         // loading: {
        //         //     ...state.loading,
        //         // },
        //         data: {
        //             ...state.data,
        //             currentItem: action.data,
        //         },
        //     };
        // case actions.LOADING_CURRENT_ITEM:
        //     return {
        //         ...state,
        //         loading: { ...state.loading, loadingCart: true },
        //     };
        case actions.LOAD_CURRENT_ITEM_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    currentItem: action.data,
                },
            };
        case actions.LOAD_CURRENT_ITEM_STOCK_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    currentItem: {
                        ...state.data.currentItem,
                        info: action.data,
                    },
                },
            };
        case actions.LOAD_CURRENT_ITEM_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, loadingCart: false },
            };
        //----------------------------------------------
        // TOGGLE PICK STOCK
        //----------------------------------------------
        case actions.TOGGLE_PICK_STOCK:
            return {
                ...state,
                showPickStock:
                    action.status == null
                        ? !state.showPickStock
                        : action.status,
            };
        //----------------------------------------------
        // ADD_CART_BY_STOCK
        //----------------------------------------------
        case actions.ADDING_CART_BY_STOCK:
            return {
                ...state,
                loading: { ...state.loading, loadingCart: true },
            };
        case actions.ADD_CART_BY_STOCK_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCart: false,
                },
                data: {
                    ...state.data,
                },
            };

        case actions.ADD_CART_BY_STOCK_FAILURE:
            return {
                ...state,
                loading: { ...state.loading, loadingCart: false },
            };
        //----------------------------------------------
        // DELETE_CART
        //----------------------------------------------
        case actions.DELETE_CART:
            return {
                ...state,
                data: { ...state.data, cartProducts: [] },
            };
        //----------------------------------------------
        // Get product info by id for homepage add cart
        //----------------------------------------------
        case actions.LOAD_PRODUCT_INFO_BY_ID:
            return {
                ...state,
                data: { ...state.data, cartProducts: [] },
            };
        case actions.CLEAR_CART_CHECKED:
            return {
                ...state,
                data: {
                    ...state.data,
                    checkedCart: [],
                },
            };
        case actions.UPDATE_CART_CHECKED:
            return {
                ...state,
                data: {
                    ...state.data,
                    checkedCart: action.payload,
                },
            };
        case actions.LOAD_CART_SYNC_PRODUCT_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    cartProducts: action.payload
                }
            }
        case actions.LOAD_ADD_CART_SYNC_PRODUCT_SUCCESS:

            return {
                ...state,
                data: {
                    ...state.data,
                    cartProducts: [...state.data.cartProducts, action.payload]
                }
            }
        default:
            return {
                ...state,
            };
    }
};

export default CartReducer;
