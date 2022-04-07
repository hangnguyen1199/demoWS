import Utils from '../../shared/utils/utils';
import actions from './action';

const initState = {
    loading: true,
    listMobile: {
        Total: 0,
        Offset: 0,
        Limit: 12,
        NewsList: [],
    },
    list: {
        Total: 0,
        Offset: 0,
        Limit: 0,
        NewsList: [],
    },
    detail: {},
    slides: [],
};

const NewsReducer = (state = initState, action) => {
    switch (action.type) {
        //----------------------------------------------
        // LOAD_NEWS_LIST
        //----------------------------------------------
        case actions.LOAD_NEWS_RESPONSE:
            return {
                ...state,
                list: action.payload,
                loading: false,
            };
        case actions.LOAD_NEWS_RESPONSE_MOBILE:
            return {
                ...state,
                listMobile: Utils.handlePagination(
                    state.listMobile,
                    action.payload,
                    action.isLoadMore,
                    'NewsList'
                ),
                loading: false,
            };
        case actions.LOADING_NEWS_LIST:
            return {
                ...state,
                loading: true,
            };
        case actions.LOAD_NEWS_LIST_FAIL:
            return {
                ...state,
                loading: false,
            };
        //----------------------------------------------
        // LOAD_NEWS_DETAIL
        //----------------------------------------------
        case actions.LOAD_NEWS_DETAIL_RESPONSE:
            return {
                ...state,
                detail: action.response,
            };
        //----------------------------------------------
        // LOAD_NEWS_SLIDE
        //----------------------------------------------
        case actions.LOAD_NEWS_SLIDE_RESPONSE:
            return {
                ...state,
                slides: action.payload,
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

export default NewsReducer;
