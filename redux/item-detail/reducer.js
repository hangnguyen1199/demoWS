import actions from '@spo/redux/item-detail/action';

const initState = {
    loading: {
        loadingRelativeProduct: false,
        loadingRecentlyProduct: false,
        loadingProductDetail: false,
        loadingProductDetailReview: false,
    },
    data: {
        relativeProducts: [],
        recentlyProducts: [],
        productDetail: {},
        productDetailReview: {},
        shopProducts: [],
        tabActive: 1,
    },
};

const ItemDetailReducer = (state = initState, action) => {
    switch (action.type) {
        //----------------------------------------------
        // PRODUCT DETAIL REVIEW
        //----------------------------------------------
        case actions.LOAD_PRODUCT_DETAIL_REVIEW_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProductDetailReview: false,
                },
                data: {
                    ...state.data,
                    productDetailReview: action.data,
                },
            };
        case actions.LOADING_PRODUCT_DETAIL_REVIEW:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProductDetailReview: true,
                },
                data: {
                    ...state.data,
                    productDetailReview: {},
                },
            };
        case actions.LOAD_PRODUCT_DETAIL_REVIEW_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProductDetailReview: false,
                },
            };
        //----------------------------------------------
        // PRODUCT DETAIL
        //----------------------------------------------
        case actions.LOAD_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProductDetail: false,
                },
                data: {
                    ...state.data,
                    productDetail: action.data,
                },
            };
        case actions.LOADING_PRODUCT_DETAIL:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProductDetail: true,
                },
                data: {
                    ...state.data,
                    productDetail: {},
                },
            };
        case actions.LOAD_PRODUCT_DETAIL_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProductDetail: false,
                },
            };
        case actions.LOAD_STOCK_INFO_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    productDetail: {
                        ...state.data.productDetail,
                        info: {...action.data},
                    },
                },
            };
        //----------------------------------------------
        //  LOAD_RECENTLY_PRODUCT_SUCCESS
        //----------------------------------------------
        case actions.LOAD_RECENTLY_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingRecentlyProduct: false,
                },
                data: {
                    ...state.data,
                    recentlyProducts: action.products,
                },
            };
        case actions.LOADING_RECENTLY_PRODUCT:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingRecentlyProduct: true,
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
        //----------------------------------------------
        // CHANGE_TAB_ACTIVE
        //----------------------------------------------
        case actions.CHANGE_TAB_ACTIVE:
            return {
                ...state,
                data: {
                    ...state.data,
                    tabActive: action.data,
                },
            };
        case actions.TOGGLE_WISHLIST_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    productDetail:{
                        ...state.data.productDetail,
                        IsFavorite: !state.data.productDetail?.IsFavorite
                    }
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default ItemDetailReducer;
