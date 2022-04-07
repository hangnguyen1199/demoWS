import actions from './action';

const initState = {
    data: {
        setting: {},
        reviewsForOrder: {},
        reviewsForChat: {},
        chatDetail: null
    },
};

const MyReviewsReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.LOAD_REVIEWS_FOR_ORDER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    reviewsForOrder: action.reviews ?? {},
                },
            };
        case actions.LOAD_REVIEWS_FOR_CHAT_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    reviewsForChat: action.reviews ?? {},
                },
            };
        case actions.LOAD_SETTING_REVIEW_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    setting: action.setting ?? {},
                },
            };
        case actions.GET_CHAT_DETAIL_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    chatDetail: action.chatDetail ?? {},
                },
            };
        case actions.GET_CHAT_DETAIL_FAILURE:
        case actions.GET_CHAT_DETAIL:
            return {
                ...state,
                data: {
                    ...state.data,
                    chatDetail: null,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default MyReviewsReducer;