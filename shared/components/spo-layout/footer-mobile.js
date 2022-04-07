import useCustomRoute from '@spo/lib/use-custom-route';
import AppActions from '@spo/redux/app/action';
import { useRouter } from 'next/router';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserLoggedActions from '../../../redux/user-logged/action';
import { GENDER } from '../../config/constants';
import PageList from '../../config/PageList';
import EventRegister, {
    EVENT_SHOW_POPUP,
    USER_QR_DATA_POPUP,
} from '../../utils/EventRegister';
import IconHome from '../common/icons/icon-home';
import IconCategory from '../common/icons/icon-category';
import IconAccount from '../common/icons/icon-account';

/**
 * ****************************************************************************
 * HAIDT Footer Mobile CODE
 * footer-mobile.js
 *
 * description		:
 * created at		:	2021-12-12
 * created by		:	HAIDT
 * package			:	spo\shared\components\spo-layout\footer-mobile.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const FooterMobile = (props) => {
    const dispatch = useDispatch();
    const ativeMenuMobile = useSelector((state) => state.App.ativeMenuMobile);
    const [isAndroid, setIsAndroid] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setIsAndroid(localStorage.getItem('isAndroid'));
        setIsIOS(localStorage.getItem('isIOS'));
    }, []);

    const handleShowUserQrPopup = () => {
        dispatch({
            type: UserLoggedActions.GET_ORDER_QR_DATA,
            callback: () => {
                EventRegister.emit(EVENT_SHOW_POPUP, {
                    type: USER_QR_DATA_POPUP,
                    open: true,
                    payload: {
                        className: '',
                        title: 'Tích điểm',
                        callback: () => {},
                    },
                });
            },
        });
    };

    useEffect(() => {
        try {
            const pathName = router.pathname;
            if (pathName.includes('/category-mobile')) {
                dispatch({
                    type: AppActions.TOGGLE_MENU_FOOTER_MOBILE,
                    data: 2,
                });
            }
        } catch (e) {}
    }, [router.query]);

    const onChangeMenu = (type) => {
        dispatch({
            type: AppActions.TOGGLE_MENU_FOOTER_MOBILE,
            data: type,
        });
        switch (type) {
            case 1:
                useCustomRoute(dispatch, '/');
                break;
            case 2:
                // if (isAndroid == 'true') {
                //     window.location.href = process.env.APP_ANDROID;
                // }
                // if (isIOS == 'true') {
                //     window.location.href = process.env.APP_IOS;
                // }
                useCustomRoute(
                    dispatch,
                    `${PageList.CATEGORY_MOBILE.INDEX}${GENDER.Male.Slug}`
                );

                break;
            case 3:
                useCustomRoute(dispatch, PageList.MAIL_BOX.SERVER);
                break;
            case 4:
                useCustomRoute(dispatch, '/account-info-mobile');
                break;
            case 5:
                handleShowUserQrPopup();
                break;
            default:
                break;
        }
    };
    const getClassActive = (slug) => {
        if (slug.includes(router.pathname)) {
            return 'active';
        }
        return '';
    };
    return (
        <div
            className="d-flex justify-content-between align-items-center footer-mobile"
            style={{
                background: 'white',
                height: 54,
                width: '100vw',
                position: 'fixed',
                bottom: 0,
                zIndex: 5,
            }}
        >
            <div className="d-flex justify-content-between align-items-center w-100 h-100">
                <div
                    className={`d-flex justify-content-between align-items-center flex-column footer-mobile-item 
                    ${getClassActive(['/', '/category/[slug]'])}`}
                    onClick={() => onChangeMenu(1)}
                >
                    <IconHome />
                    {/* <img className="home_icon_footer" src="/images/icon-mobile/ic_home.svg"></img> */}
                    <span>Home</span>
                </div>
                <div
                    className={`d-flex justify-content-between align-items-center flex-column footer-mobile-item 
                    ${getClassActive(['/category-mobile/[slug]'])}`}
                    onClick={() => onChangeMenu(2)}
                >
                    {/* <img className="home_icon_footer" src="/images/icon-mobile/ic_category.svg"></img> */}
                    <IconCategory />
                    <span>Danh mục</span>
                </div>
                <div>
                    {/* <img src='/images/icon-mobile/ic_scan.svg'></img> */}
                </div>
                <div
                    className={`d-flex justify-content-between align-items-center flex-column footer-mobile-item 
                    ${getClassActive(['/mail-box'])}`}
                    onClick={() => onChangeMenu(3)}
                >
                    <img
                        className="home_icon_footer"
                        src="/images/icon-mobile/ic_mail.svg"
                    ></img>
                    <span>Hộp thư</span>
                </div>
                <div
                    className={`d-flex justify-content-between align-items-center flex-column footer-mobile-item 
                    ${getClassActive(['/account-info-mobile'])}`}
                    onClick={() => onChangeMenu(4)}
                >
                    {/* <img
                        className="home_icon_footer"
                        src="/images/icon-mobile/ic_account.svg"
                    ></img> */}
                    <IconAccount />
                    <span>Tài khoản</span>
                </div>
            </div>
        </div>
    );
};
FooterMobile.propTypes = {};
FooterMobile.defaultProps = {};
export default React.memo(FooterMobile);
