export const RELOAD_EVENT = 'reload';
export const RELOAD_EVENT_WALLET_FM = 'reload_wallet_fm';
export const EVENT_SHOW_POPUP = 'SHOW_POPUP';
export const EVENT_HIDE_POPUP = 'EVENT_HIDE_POPUP';
export const EVENT_SHOW_POPUP2 = 'SHOW_POPUP2';
export const EVENT_HIDE_POPUP2 = 'EVENT_HIDE_POPUP2';
export const CLOSE_POPUP_WHEN_LOGOUT = 'CLOSE_POPUP_WHEN_LOGOUT';
export const CLOSE_POPUP_REGISTER_SUCCESS = 'CLOSE_POPUP_REGISTER_SUCCESS';
export const RELOAD_EDIT_SUCCESS = 'RELOAD_EDIT_SUCCESS';
export const RELOAD_UPDATE_REVIEW_SUCCESS = 'RELOAD_UPDATE_REVIEW_SUCCESS';
export const RELOAD_FINISH_CHAT_SUCCESS = 'RELOAD_FINISH_CHAT_SUCCESS';

/*
Các sự kiện phần chat (góp ý, khiếu nại
*/
export const ROOT_SYSTEM_ADD_COMMENT = 'ROOT_SYSTEM_ADD_COMMENT';
export const ROOT_SYSTEM_FINISH_COMMENT = 'ROOT_SYSTEM_FINISH_COMMENT';
export const ON_RECEIVED_MESSAGE_EVENT = 'ON_RECEIVED_MESSAGE_EVENT';
export const ON_ADMIN_RECEIVED_AND_READ_MESSAGE_EVENT =
    'ON_ADMIN_RECEIVED_AND_READ_MESSAGE_EVENT';
export const ON_ADMIN_FINISH_EVENT = 'ON_ADMIN_FINISH_EVENT';
export const ON_ADMIN_JOIN_CHAT = 'ON_ADMIN_JOIN_CHAT';

export const POPUP_SUCCESS_TYPE = 'POPUP_SUCCESS_TYPE';
export const POPUP_ERROR_TYPE = 'POPUP_ERROR_TYPE';
export const POPUP_WARNING_TYPE = 'POPUP_WARNING_TYPE';
export const POPUP_TEXT_TYPE = 'POPUP_TEXT_TYPE';

export const POPUP_ACCOUNT_LOCKED = 'POPUP_ACCOUNT_LOCKED';

export const REGISTER_POPUP_WARNING_TYPE = 'REGISTER_POPUP_WARNING_TYPE';

export const SUCCESS_POPUP = 'SUCCESS_POPUP';
export const WARNING_POPUP = 'WARNING_POPUP';
export const CONFIRM_POPUP = 'CONFIRM_POPUP';
export const ADD_ADDRESS_POPUP = 'ADD_ADDRESS_POPUP';
export const CHOOSE_VOUCHER_POPUP = 'CHOOSE_VOUCHER_POPUP';
export const CHOOSE_FREESHIP_VOUCHER_POPUP = 'CHOOSE_FREESHIP_VOUCHER_POPUP';
export const REVIEW_POPUP = 'REVIEW_POPUP';
export const OPEN_DRAWER_CART = 'OPEN_DRAWER_CART';
//
export const BUY_POINT_POPUP = 'BUY_POINT_POPUP';
export const BUY_POINT_BANK_POPUP = 'BUY_POINT_BANK_POPUP';
export const PURCHASE_BAR_CODE_POPUP = 'PURCHASE_BAR_CODE_POPUP';
export const POINTS_TRANSACTION_DETAIL_POPUP =
    'POINTS_TRANSACTION_DETAIL_POPUP';
//
export const USER_QR_DATA_POPUP = 'USER_QR_DATA_POPUP';
export const DAILY_REWARD_POPUP = 'DAILY_REWARD_POPUP';
// Popup yêu cầu xác thực phone
export const REQUEST_VERIFY_PHONE_POPUP = 'REQUEST_VERIFY_PHONE_POPUP';
export const CHANGE_PHONE_POPUP = 'CHANGE_PHONE_POPUP';
export const CHANGE_MAIL_POPUP = 'CHANGE_MAIL_POPUP';

export const SHOW_IMAGE_POPUP = 'SHOW_IMAGE_POPUP';

export const REFUND_REASON_POPUP = 'REFUND_REASON_POPUP';

// Key popup
export const FIRST_POPUP = 1;
export const SECOND_POPUP = 2;


export const SHOW_LOADING = 'SHOW_LOADING';
export const SHOW_LIST_COLOR = 'SHOW_LIST_COLOR';

export const DELETE_DATA_FILTER = 'DELETE_DATA_FILTER'
export const SHOW_POPUP_DATA_DETAIL = 'SHOW_POPUP_DATA_DETAIL'
export default class EventRegister {
    static listeners = {
        count: 0,
        refs: {},
    };

    static addEventListener(eventName, callback) {
        if (typeof eventName === 'string' && typeof callback === 'function') {
            EventRegister.listeners.count++;
            const eventId = 'l' + EventRegister.listeners.count;
            EventRegister.listeners.refs[eventId] = {
                name: eventName,
                callback,
            };
            return eventId;
        }
        return false;
    }

    static removeEventListener(id) {
        if (typeof id === 'string') {
            return delete EventRegister.listeners.refs[id];
        }
        return false;
    }

    static removeAllListeners() {
        let removeError = false;
        Object.keys(EventRegister.listeners.refs).forEach((id) => {
            const removed = delete EventRegister.listeners.refs[id];
            removeError = !removeError ? !removed : removeError;
        });
        return !removeError;
    }

    static emitEvent(eventName, data) {
        Object.keys(EventRegister.listeners.refs).forEach((id) => {
            if (
                EventRegister.listeners.refs[id] &&
                eventName === EventRegister.listeners.refs[id].name
            ) {
                EventRegister.listeners.refs[id].callback(data);
            }
        });
    }

    static on(eventName, callback) {
        return EventRegister.addEventListener(eventName, callback);
    }

    static off(eventName) {
        return EventRegister.removeEventListener(eventName);
    }

    static offAll() {
        return EventRegister.removeAllListeners();
    }

    static emit(eventName, data) {
        EventRegister.emitEvent(eventName, data);
    }
}
