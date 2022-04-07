import actions from '@spo/redux/product-list-watched/action';

const initState = {
    loading: {
        loadingWatchedProductList: false,
    },
    offset: {
        offset: 0,
    },
    limit: {
        limit: 0,
    },
    total: {
        total: 0,
    },
    data: {
        watchedProductList: [],
        relativeProducts: []
    },
};

const ProductListWatchedReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.LOAD_WATCHED_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingWatchedProductList: false,
                },
                data: {
                    ...state.data,
                    watchedProductList: action.response.watched.List,
                    relativeProducts: action.response.relative.List,
                },
                offset: {
                    ...state.offset,
                    offset: action.response.watched.Offset,
                },
                limit: {
                    ...state.limit,
                    limit: action.response.watched.Limit,
                },
                total: {
                    ...state.total,
                    total: action.response.watched.Total,
                },
            };
        case actions.LOADING_WATCHED_PRODUCT_LIST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingWatchedProductList: true,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default ProductListWatchedReducer;
