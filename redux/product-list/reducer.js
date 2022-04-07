import actions from "./action";


let initialState = {
    loading: {
        loadingTypeProductList: false,
    },
    offset: {
        offset: 0,
    },
    limit: {
        limit: 0,
    },
    total: {
        total: null,
    },
    data: {
        typeProductList: [],
        supperSalePromotionTimeList: [],
    },
}
const myReducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.LOAD_PRODUCT_LIST_WITH_TYPE_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingTypeProductList: true,
                },
            };
        case actions.LOAD_PRODUCT_LIST_WITH_TYPE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingTypeProductList: false,
                },
                data: {
                    ...state.data,
                    typeProductList: action.response.List,
                },
                offset: {
                    ...state.offset,
                    offset: action.response.Offset,
                },
                limit: {
                    ...state.limit,
                    limit: action.response.Limit,
                },
                total: {
                    ...state.total,
                    total: action.response.Total,
                },
            };
        case actions.LOAD_PRODUCT_LIST_WITH_SALE_TYPE_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingTypeProductList: true,
                },
            };
        case actions.LOAD_PRODUCT_LIST_WITH_SALE_TYPE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingTypeProductList: false,
                },
                data: {
                    ...state.data,
                    typeProductList: action.response.List,
                    supperSalePromotionTimeList: action.response.PromotionsTime
                },
                offset: {
                    ...state.offset,
                    offset: action.response.Offset,
                },
                limit: {
                    ...state.limit,
                    limit: action.response.Limit,
                },
                total: {
                    ...state.total,
                    total: action.response.Total,
                },
            };
        default:
            return {
                ...state
            }
    }

}

export default myReducer;