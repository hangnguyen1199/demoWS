import actions from './action';

const initState = {
    loading: {
        loadingProduct: false,
        loadingCurrentCategory: false,
        loadingTitleSearch: false,
        loadingCategoryName: false,
    },
    showSearchAdvanced: false,
    showGender: false,
    showCategory: false,
    showCategorySecond: false,
    showBrand: false,
    showHottrend: false,
    data: {
        gender: {},
        category: {},
        category_second: {},
        brands: [],
        hottrends: [],
        products: [],
        currentCategory: [],
        title_search: '',
        includeColor: [],
        includeSize: [],
        scroll_products: [],
    },
    offset: {
        products: 0,
        scroll_products: 0,
    },
    limit: {
        products: 0,
        scroll_products: 0,
    },
    total: {
        products: 0,
        scroll_products: 0,
    },
};

const SearchItemReducer = (state = initState, action) => {
    switch (action.type) {
        //----------------------------------------------
        // FILTER ITEM
        //----------------------------------------------
        case actions.FILTERRING_ITEM:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProduct: true,
                },
            };
        case actions.FILTER_ITEM_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProduct: false,
                },
                data: {
                    ...state.data,
                    products: action.response.items,
                    includeColor: action.response.colors ?? [],
                    includeSize: action.response.sizes ?? [],
                    scroll_products: action.response.items,
                },
                offset: {
                    ...state.offset,
                    products: action.response.offset,
                    scroll_products: action.response.offset,
                },
                limit: {
                    ...state.limit,
                    products: action.response.limit,
                    scroll_products: action.response.limit,
                },
                total: {
                    ...state.total,
                    products: action.response.total,
                    scroll_products: action.response.total,
                },
            };
        case actions.FILTER_ITEM_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProduct: false,
                },
            };
        //----------------------------------------------
        // FILTER ITEM LOAD MORE
        //----------------------------------------------
        case actions.FILTERRING_ITEM_LOAD_MORE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProduct: true,
                },
            };
        case actions.FILTER_ITEM_LOAD_MORE_SUCCESS:
            let _new_list_product = [...state.data.scroll_products];
            _new_list_product = _new_list_product.concat([
                ...action.response.items,
            ]);
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProduct: false,
                },
                data: {
                    ...state.data,
                    products: action.response.items,
                    includeColor: action.response.colors ?? [],
                    includeSize: action.response.sizes ?? [],
                    scroll_products: [..._new_list_product],
                },
                offset: {
                    ...state.offset,
                    products: action.response.offset,
                    scroll_products: action.response.offset,
                },
                limit: {
                    ...state.limit,
                    products: action.response.limit,
                    scroll_products: action.response.limit,
                },
                total: {
                    ...state.total,
                    products: action.response.total,
                    scroll_products: action.response.total,
                },
            };
        case actions.FILTER_ITEM_LOAD_MORE_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingProduct: false,
                },
            };
        //
        //----------------------------------------------
        // GENDER SELECTED
        //----------------------------------------------
        case actions.UPDATE_GENDER_SELECTED:
            return {
                ...state,
                data: {
                    ...state.data,
                    gender: action.data,
                },
            };
        //
        //----------------------------------------------
        // CATEGORY SELECTED
        //----------------------------------------------
        case actions.UPDATE_CATEGORY_SELECTED:
            return {
                ...state,
                data: {
                    ...state.data,
                    category: action.data,
                },
            };
        //
        //----------------------------------------------
        // CATEGORY sECOND SELECTED
        //----------------------------------------------
        case actions.UPDATE_CATEGORY_SECOND_SELECTED:
            return {
                ...state,
                data: {
                    ...state.data,
                    category_second: action.data,
                },
            };
        //
        //----------------------------------------------
        // BRAND SELECTED
        //----------------------------------------------
        case actions.UPDATE_BRAND_SELECTED:
            return {
                ...state,
                data: {
                    ...state.data,
                    brands: action.data,
                },
            };
        //
        //----------------------------------------------
        // HOTTREND SELECTED
        //----------------------------------------------
        case actions.UPDATE_HOTTREND_SELECTED:
            return {
                ...state,
                data: {
                    ...state.data,
                    hottrends: action.data,
                },
            };

        //
        //----------------------------------------------
        // TOGGLE SEARCH ADVANCED
        //----------------------------------------------
        case actions.TOGGLE_SEARCH_ADVANCED_SCREEN:
            return {
                ...state,
                showSearchAdvanced: !state.showSearchAdvanced,
            };
        //
        //----------------------------------------------
        // TOGGLE GENDER
        //----------------------------------------------
        case actions.TOGGLE_GENDER_SCREEN:
            return {
                ...state,
                showGender: !state.showGender,
            };
        //
        //----------------------------------------------
        // TOGGLE CATEGORY
        //----------------------------------------------
        case actions.TOGGLE_CATEGORY_SCREEN:
            return {
                ...state,
                showCategory: !state.showCategory,
            };

        //
        //----------------------------------------------
        // TOGGLE CATEGORY SECOND
        //----------------------------------------------
        case actions.TOGGLE_CATEGORY_SECOND_SCREEN:
            return {
                ...state,
                showCategorySecond: !state.showCategorySecond,
            };
        //
        //----------------------------------------------
        // TOGGLE BRAND
        //----------------------------------------------
        case actions.TOGGLE_BRAND_SCREEN:
            return {
                ...state,
                showBrand: !state.showBrand,
            };
        //
        //----------------------------------------------
        // TOGGLE HOTTREND
        //----------------------------------------------
        case actions.TOGGLE_HOTTREND_SCREEN:
            return {
                ...state,
                showHottrend: !state.showHottrend,
            };
        //----------------------------------------------
        // CURRENT CATEGORY
        //----------------------------------------------
        case actions.GETTING_CURRENT_CATEGORY:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCurrentCategory: true,
                },
            };
        case actions.GET_CURRENT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCurrentCategory: false,
                },
                data: {
                    ...state.data,
                    currentCategory: action.response,
                },
            };
        case actions.GET_CURRENT_CATEGORY_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCurrentCategory: false,
                },
            };
        //----------------------------------------------
        // GET CATEGORY NAME
        //----------------------------------------------
        case actions.GETTING_CATEGORY_NAME:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCategoryName: true,
                },
            };
        case actions.GET_CATEGORY_NAME_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCategoryName: false,
                },
                data: {
                    ...state.data,
                    category_second: action.response,
                },
            };
        case actions.GET_CATEGORY_NAME_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingCategoryName: false,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default SearchItemReducer;
