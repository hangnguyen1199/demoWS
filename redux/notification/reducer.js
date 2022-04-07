import actions from './action';
import Cookies from 'js-cookie';

const initState = {
    loading: {
        loadingNotification: false,
        updatingNotification: false,
    },
    data: {
        notifications: [],
        count_unread: 0,
    },
    total: {
        notifications: 0,
    },
    limit: {
        notifications: 0,
    },
    offset: {
        notifications: 0,
    },
};

const NotificationReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.LOAD_USER_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingNotification: false,
                },
                data: {
                    ...state.data,
                    notifications: action.response.notifications,
                    count_unread: action.response.count_unread,
                },
                total: {
                    ...state.total,
                    notifications: action.response.total,
                },
                limit: {
                    ...state.limit,
                    notifications: action.response.limit,
                },
                offset: {
                    ...state.offset,
                    notifications: action.response.offset,
                },
            };

        case actions.LOADING_USER_NOTIFICATION:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingNotification: true,
                },
            };
        case actions.LOAD_USER_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    loadingNotification: false,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default NotificationReducer;
