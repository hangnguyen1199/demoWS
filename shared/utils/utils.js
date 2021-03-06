import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';

import EventRegister, {
    EVENT_SHOW_POPUP,
    POPUP_ERROR_TYPE,
    POPUP_SUCCESS_TYPE,
    POPUP_TEXT_TYPE,
    POPUP_WARNING_TYPE,
    SUCCESS_POPUP,
    WARNING_POPUP,
    REGISTER_POPUP_WARNING_TYPE,
    POPUP_ACCOUNT_LOCKED,
    EVENT_SHOW_POPUP2,
    FIRST_POPUP,
} from './EventRegister';

import Md5 from 'md5';
import { format } from 'date-fns';
import useCustomRoute from '../library/use-custom-route';
import PageList from '../config/PageList';
import constants from '../config/constants';

export default class Utils {
    static getGender (id) {
        const common = useSelector((state) => state.Common);
        let gender = common.data.listCategory.filter((c) => c.GenderId == id);
        if (gender.length > 0) {
            return gender[0];
        }
        return null;
    }
    static getCategory (slug) {
        const common = useSelector((state) => state.Common);
        let sub;
        common.data.listCategory.forEach((gender) => {
            gender.ListCategory.forEach((cate) => {
                if (cate.Slug == slug) {
                    sub = cate;
                }
                let category = cate.CategoriesChild.filter(
                    (c) => c.Slug == slug,
                );
                if (category.length > 0) {
                    sub = category[0];
                    
                }
            });
        });
        return sub;
    }
    static isLogged () {
        const token = Cookies.get('token');
        const jwtDecodeValue = Utils.decodeJWT(token);
        if (!token || jwtDecodeValue.isExpired) {
            return false;
        }
        return true;
    }

    static decodeJWT (token) {
        if (!token) {
            return null;
        } else {
            let value = jwtDecode(token);
            return {
                isExpired: value.exp < new Date().getTime() / 1000,
            };
        }
    }
    static alertPopup (
        title = 'Title',
        type = POPUP_TEXT_TYPE,
        callback = null,
        layer = FIRST_POPUP,
        backdropCallback = null
    ) {
        let eventName = layer == FIRST_POPUP ? EVENT_SHOW_POPUP : EVENT_SHOW_POPUP2
        let typePopup = POPUP_TEXT_TYPE;
        switch (type) {
            case POPUP_WARNING_TYPE:
                typePopup = WARNING_POPUP;
                break;
            case POPUP_ERROR_TYPE:
                typePopup = POPUP_TEXT_TYPE;
                break;
            case POPUP_SUCCESS_TYPE:
                typePopup = SUCCESS_POPUP;
                break;
            case POPUP_ACCOUNT_LOCKED:
                typePopup = POPUP_ACCOUNT_LOCKED;
                break;

            default:
                typePopup = POPUP_TEXT_TYPE;
                break;
        }
        EventRegister.emit(eventName, {
            type   : typePopup,
            open   : true,
            payload: {
                title: title,
                callback,
                backdropCallback
            },
        });
    }
    static confirmPopup (title = 'Title', callback, type = POPUP_SUCCESS_TYPE) {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type   : 'CONFIRM_POPUP',
            open   : true,
            payload: {
                title   : title,
                callback: callback,
            },
        });
    }
    static getLocation () {
        return ['106', '108'];
    }
    static MD5 (val) {
        return Md5(`${val}123456789zxcvbnm`);
    }
    static handlePagination (oldData, newData, isLoadMore, nameClass) {
        let _newData = [...oldData[nameClass]];
        let newOffset = oldData.Offset;
        if (isLoadMore) {
            if (
                newData[nameClass].length > 0 &&
                newData.Total > _newData.length
            ) {
                _newData = _newData.concat([...newData[nameClass]]);
            }
            newOffset = newData.Offset;
        } else {
            _newData = [...newData[nameClass]];
        }
        let newList = {
            Limit : newData.Limit,
            Offset: newOffset,
            Total : newData.Total,
        };
        newList[nameClass] = [..._newData];
        return newList;
    }
    static specialTrim (str) {
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
        str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
        str = str.replace(/??|??|???|???|??/g, 'i');
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
        str = str.replace(/???|??|???|???|???/g, 'y');
        str = str.replace(/??/g, 'd');
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
        str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
        str = str.replace(/??|??|???|???|??/g, 'i');
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
        str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
        str = str.replace(/???|??|???|???|???/g, 'y');
        str = str.replace(/??/g, 'd');
        // clear special character
        str = str.replace(/,|\./g, '');
        //
        str = str.toUpperCase();
        return str;
    }

    static renderWarningText (QuantityInBranch, Quantity, className = "text-left") {
        if (QuantityInBranch == 0) {
            return (
                <div
                    className={className}
                    style={{
                        color     : '#FF2C00',
                        fontWeight: 400,
                        fontSize  : 16,
                    }}>
                    S???n ph???m n??y hi???n kh??ng c??n h??ng
                </div>
            );
        } else if (QuantityInBranch < Quantity) {
            return (
                <div
                    className={className}
                    style={{
                        color     : '#FF2C00',
                        fontWeight: 400,
                        fontSize  : 16,
                    }}>
                    S??? l?????ng trong kho c??n {QuantityInBranch}
                </div>
            );
        } else if (QuantityInBranch == Quantity) {
            return (
                <div
                    className={className}
                    style={{
                        color     : '#FF2C00',
                        fontWeight: 400,
                        fontSize  : 16,
                    }}>
                    S??? l?????ng trong kho c??n {QuantityInBranch}
                </div>
            );
        }
    }
    static _formatDate (val) {
        return format(val, "dd/MM/yyyy")
    }

    static showPopupRequestVerifyPhone () {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type   : 'REQUEST_VERIFY_PHONE_POPUP',
            open   : true,
            payload: {
                title   : "X??c th???c s??? ??i???n tho???i",
                callback: (res) => {
                    if (res?.IsVerifyAccount != constants.V002.VERIFYED) {
                        useCustomRoute(null, PageList.ACCOUNT_INFO.SERVER,{},false,null,2)
                    }
                },
            },
        });
    }
}
