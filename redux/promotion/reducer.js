import Utils from '../../shared/utils/utils';
import actions from './action';

const initState = {
    list: {
        Total: 0,
        Offset: 0,
        Limit: 0,
        Promotions: [],
    },
    loading:true,
    listMobile: {
        Total: 0,
        Offset: 0,
        Limit: 12,
        Promotions: [],
    },
    detail: {},
    slides: [],
};

const PromotionReducer = (state = initState, action) => {
    switch (action.type) {
        //----------------------------------------------
        // LOAD_PROMOTION_LIST
        //----------------------------------------------
        case actions.LOAD_PROMOTION_LIST_RESPONSE:
            return {
                ...state,
                list: action.payload,
                loading:false
            };
        case actions.LOAD_PROMOTION_LIST_RESPONSE_MOBILE:
            return {
                ...state,
                listMobile: Utils.handlePagination(
                    state.listMobile,
                    action.payload,
                    action.isLoadMore,
                    'Promotions',
                ),
                loading:false
            };
        case actions.LOADING_PROMOTION_LIST:
            return {
                ...state,
                loading: true,
            };
        case actions.LOAD_PROMOTION_LIST_FAIL:
            return {
                ...state,
                loading: false,
            };
        //----------------------------------------------
        // LOAD_PROMOTION_DETAIL
        //----------------------------------------------
        case actions.LOAD_PROMOTION_DETAIL_RESPONSE:
            return {
                ...state,
                detail: action.payload,
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

export default PromotionReducer;
