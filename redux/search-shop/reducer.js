import actions from './action';

const initState = {
    loading: {
        loadingSearchShop:false
    },
    data: {
        resultSearchShop:[]
    },
    offset: {
        resultSearchShop: 0,
    },
    limit: {
        resultSearchShop: 0,
    },
    total: {
        resultSearchShop:0
    }
};

const SearchShopReducer = (state = initState, action) => {
    switch (action.type) {
        //----------------------------------------------
        // SEARCH SHOP 
        //----------------------------------------------
        case actions.SEARCHING_SHOP:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSearchShop: true
                },
            };
        case actions.SEARCH_SHOP_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSearchShop: false
                },
                data: {
                    ...state.data,
                    resultSearchShop: action.response.shops,
                },
                offset: {
                    ...state.offset,
                    resultSearchShop: action.response.offset,
                },
                limit: {
                    ...state.limit,
                    resultSearchShop: action.response.limit,
                },
                total: {
                    ...state.total,
                    resultSearchShop: action.response.total,
                }

            };
        case actions.SEARCH_SHOP_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSearchShop: false
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default SearchShopReducer;
