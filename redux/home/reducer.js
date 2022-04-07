import actions from './action';
import Cookies from 'js-cookie';

const initState = {
    loading: {
        loadingNewestProduct: false,
    },
    offset: {
        newestProducts: 0,
    },
    limit: {
        newestProducts: 0,
    },
    total: {
        newestProducts: 0,
    },
    data: {
        newestProducts: [],
        mayBeYouCareProducts: []
    },
    productInHome: {
        Fm: {
            productNewest: [],
            productGoldenHour: [],
            productSuperPromotion: [],
            productTopViewer: [],
            productTrending: [],
            productCare:[],
            productSuggestList: {
                Total: 0,
                Offset: 0,
                Limit: 12,
                List: [],
            },
        },
        Male: {
            productNewest: [],
            productGoldenHour: [],
            productSuperPromotion: [],
            productTopViewer: [],
            productTrending: [],
            productCare:[],
            productSuggestList: {
                Total: 0,
                Offset: 0,
                Limit: 12,
                List: [],
            },
        },
        Female: {
            productNewest: [],
            productGoldenHour: [],
            productSuperPromotion: [],
            productTopViewer: [],
            productTrending: [],
            productCare:[],
            productSuggestList: {
                Total: 0,
                Offset: 0,
                Limit: 12,
                List: [],
            },
        },
        Unisex: {
            productNewest: [],
            productGoldenHour: [],
            productSuperPromotion: [],
            productTopViewer: [],
            productTrending: [],
            productCare:[],
            productSuggestList: {
                Total: 0,
                Offset: 0,
                Limit: 12,
                List: [],
            },
        },
        Couple: {
            productNewest: [],
            productGoldenHour: [],
            productSuperPromotion: [],
            productTopViewer: [],
            productTrending: [],
            productCare:[],
            productSuggestList: {
                Total: 0,
                Offset: 0,
                Limit: 12,
                List: [],
            },
        },
        Child: {
            productNewest: [],
            productGoldenHour: [],
            productSuperPromotion: [],
            productTopViewer: [],
            productTrending: [],
            productCare:[],
            productSuggestList: {
                Total: 0,
                Offset: 0,
                Limit: 12,
                List: [],
            },
        },
    },
};

const HomeReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.LOAD_TOP_VIEWED_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingTopProduct: false,
                },
                data: {
                    ...state.data,
                    topProducts: action.response.List,
                },
                offset: {
                    ...state.offset,
                    topProducts: action.response.Offset,
                },
                limit: {
                    ...state.limit,
                    topProducts: action.response.Limit,
                },
                total: {
                    ...state.total,
                    topProducts: action.response.Total,
                },
            };
        case actions.LOAD_NEWEST_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingNewestProduct: false,
                },
                data: {
                    ...state.data,
                    newestProducts: action.response.List,
                },
                offset: {
                    ...state.offset,
                    newestProducts: action.response.Offset,
                },
                limit: {
                    ...state.limit,
                    newestProducts: action.response.Limit,
                },
                total: {
                    ...state.total,
                    newestProducts: action.response.Total,
                },
            };
        case actions.LOAD_GOLDEN_HOUR_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingGoldenHourProduct: false,
                },
                data: {
                    ...state.data,
                    goldenHourProducts: action.response.List,
                },
                offset: {
                    ...state.offset,
                    goldenHourProducts: action.response.Offset,
                },
                limit: {
                    ...state.limit,
                    goldenHourProducts: action.response.Limit,
                },
                total: {
                    ...state.total,
                    goldenHourProducts: action.response.Total,
                },
            };
        case actions.LOAD_SUPPER_SALE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingSupperSaleProduct: false,
                },
                data: {
                    ...state.data,
                    supperSaleProducts: action.response.List,
                },
                offset: {
                    ...state.offset,
                    supperSaleProducts: action.response.Offset,
                },
                limit: {
                    ...state.limit,
                    supperSaleProducts: action.response.Limit,
                },
                total: {
                    ...state.total,
                    supperSaleProducts: action.response.Total,
                },
            };
        case actions.LOAD_TRENDING_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingTrendingProduct: false,
                },
                data: {
                    ...state.data,
                    trendingProducts: action.response.List,
                },
                offset: {
                    ...state.offset,
                    trendingProducts: action.response.Offset,
                },
                limit: {
                    ...state.limit,
                    trendingProducts: action.response.Limit,
                },
                total: {
                    ...state.total,
                    trendingProducts: action.response.Total,
                },
            };
        case actions.LOAD_NEWS_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingNews: false,
                },
                data: {
                    ...state.data,
                    listNews: action.response.NewsList,
                },
                offset: {
                    ...state.offset,
                    listNews: action.response.Offset,
                },
                limit: {
                    ...state.limit,
                    listNews: action.response.Limit,
                },
                total: {
                    ...state.total,
                    listNews: action.response.Total,
                },
            };
        case actions.LOAD_PROMOTION_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingPromotion: false,
                },
                data: {
                    ...state.data,
                    listPromotion: action.response.Promotions,
                },
                offset: {
                    ...state.offset,
                    listPromotion: action.response.Offset,
                },
                limit: {
                    ...state.limit,
                    listPromotion: action.response.Limit,
                },
                total: {
                    ...state.total,
                    listPromotion: action.response.Total,
                },
            };
        case actions.LOAD_MAY_BE_YOU_CARE_PRODUCT_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    mayBeYouCareProducts: action.response.List,
                },
            };
        case actions.LOAD_PRODUCT_FILTER:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    listSearchTop: true,
                },
            };
        case actions.LOAD_PRODUCT_FILTER_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    listSearchTop: false,
                },
                data: {
                    ...state.data,
                    listSearchTop: action.response.List,
                },
                offset: {
                    ...state.offset,
                    listSearchTop: action.response.Offset,
                },
                limit: {
                    ...state.limit,
                    listSearchTop: action.response.Limit,
                },
                total: {
                    ...state.total,
                    listSearchTop: action.response.Total,
                },
            };
        case actions.LOAD_PRODUCT_FILTER_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    listSearchTop: false,
                },
            };
        case actions.GET_PRODUCT_IN_HOME_SUCCESS:
            let _newList = { ...state.productInHome };
            _newList[action.payload.Gender][action.payload.TypeFilter] =
				action.payload.List;
            return {
                ...state,
                productInHome: _newList,
            };
        default:
            return {
                ...state,
            };
    }
};

export default HomeReducer;
