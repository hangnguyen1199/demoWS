import Utils from "../../shared/utils/utils";
import actions from "./action";

const initState = {
    loading: false,
    newsList: {
        NewsList: [],
        Total: null,
        Offset: 0,
        Limit: 0,
    },
    notificationList: {
        notifications: [],
        Total: null,
        Offset: 0,
        Limit: 0,
    },
    messageList: [],
    promotionList: {
        Limit: 0,
        Offset: 0,
        Promotions: [],
        Total: null,
    },
};

const MailBoxReducer = (state = initState, action) => {
    switch (action.type) {
    //----------------------------------------------
    // LOAD_NEWS_LIST
    //----------------------------------------------
        case actions.FETCH_NEWS_LIST:
            return {
                ...initState,
                loading: true,
            };

        case actions.FETCH_NEWS_LIST_SUCCESS:
            return {
                ...state,
                newsList: action.payload,
                loading: false,
            };

        case actions.FETCH_NEWS_LIST_FAILURE:
            return {
                ...state,
                loading: false,
            };

            //----------------------------------------------
            // LOAD_NOTIFICATION_LIST
            //----------------------------------------------
        case actions.FETCH_NOTIFICATION_LIST:
            return {
                ...initState,
                loading: true,
            };

        case actions.FETCH_NOTIFICATION_LIST_SUCCESS:
            return {
                ...state,
                notificationList: action.payload,
                loading: false,
            };

        case actions.FETCH_NOTIFICATION_LIST_FAILURE:
            return {
                ...state,
                loading: false,
            };
            //----------------------------------------------
            // LOAD_PROMOTION_LIST
            //----------------------------------------------
        case actions.FETCH_PROMOTION_LIST:
            return {
                ...initState,
                loading: true,
            };

        case actions.FETCH_PROMOTION_LIST_SUCCESS:
            return {
                ...state,
                promotionList: action.payload,
                loading: false,
            };

        case actions.FETCH_PROMOTION_LIST_FAILURE:
            return {
                ...state,
                loading: false,
            };
            //----------------------------------------------
            // LOAD_MESSAGE_LIST
            //----------------------------------------------
        case actions.FETCH_MESSAGE_LIST:
            return {
                ...initState,
                loading: true,
            };

        case actions.FETCH_MESSAGE_LIST_SUCCESS:
            return {
                ...state,
                promotionList: action.payload.Promotions,
                loading: false,
            };

        case actions.FETCH_MESSAGE_LIST_FAILURE:
            return {
                ...state,
                loading: false,
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

export default MailBoxReducer;
