import { useDispatch, useSelector } from 'react-redux';
import ButtonDark from '@spo/components/common/button-dark';
import ButtonLight from '@spo/components/common/button-light';
import TopCart from '@spo/components/spo-top/top-cart';
import useCustomRoute from '@spo/lib/use-custom-route';
import AppActions from '@spo/redux/app/action';
import dynamic from 'next/dynamic';
import React, { useRef, useState , useEffect } from 'react';
import { useIntl } from 'react-intl';
import AuthActions from '../../../redux/auth/action';
import MenuActions from '../../../redux/top-search-menu/action';
import Utils from '../../utils/utils';
import Display from '../common/display';
import IconMail from './../common/icon-mail';
import IconUser from './../common/icon-user';
import IconHeart from './../common/icon-heart';
import IconCart from './../common/icon-cart';
import constants from '../../config/constants';
import useWindowSize from '@spo/lib/use-window-size';
import AppConfig from '../../config/AppConfig';
import { closeTopCart, scrollTop } from '../../library/helper';
import useHover from '../../library/use-hover';
import PageList from '../../config/PageList';
import ButtonMain from '../common/button-main';

/**
 * ****************************************************************************
 * HAIDT TopMenu CODE
 * top-menu.js
 *
 * description		:
 * created at		:	2021-11-11
 * created by		:	HAIDT
 * package			:	spo\shared\components\spo-top\top-menu.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const TopMenu = (props) => {
    const intl = useIntl();
    const { user, carts } = props;
    const dispatch = useDispatch();
    const isLogin = Utils.isLogged();
    const windowSize = useWindowSize();
    const userProfile = useSelector((state) => state.Auth.data.User);
    const total = carts.reduce(
        (sum, item) => (sum += item.Quantity * item.MinPrice),
        0,
    );
    const quantity = carts.reduce((sum, item) => (sum += item.Quantity), 0);

    //----------------------------------------------
    // Function
    //----------------------------------------------
    const closeSearchInput = () => {
        dispatch({
            type: MenuActions.CLOSE_SEARCH_INPUT,
        });
    };

    const gotoCart = () => {
        useCustomRoute(dispatch, PageList.CART.SERVER);
        scrollTop()
    };
    const gotoCart2 = () => {
        if (windowSize?.width >= constants.WINDOW_SIZE.MEDIUM) {
            useCustomRoute(dispatch, PageList.CART.SERVER);
        } else {
            // closeTopCart()
        }
    };
    const gotoOrder = () => {
        setIsShowDrop('none');
        useCustomRoute(dispatch, PageList.ORDER_MANAGEMENT.SERVER);
    };
    const onGoProfile = () => {
        setIsShowDrop('none');
        useCustomRoute(dispatch, PageList.ACCOUNT_INFO.SERVER);
    };
    const onGoSignIn = () => {
        setIsShowDrop('none');
        dispatch({
            type: AppActions.CHANGE_TYPE_SIGN_IN_SIGN_UP,
            data: 0,
        });
        useCustomRoute(dispatch, PageList.SIGNIN.SERVER);
    };
    const onGoSignOut = () => {
        dispatch({
            type: AuthActions.LOGOUT,
            products: [],
        });
        dispatch({
            type: AuthActions.GET_USER_SUCCESS,
            data: {},
        });
        useCustomRoute(dispatch, '/');
    };
    const onGoSignUp = () => {
        setIsShowDrop('none');
        dispatch({
            type: AppActions.CHANGE_TYPE_SIGN_IN_SIGN_UP,
            data: 1,
        });
        useCustomRoute(dispatch, PageList.SIGNIN.SERVER);
    };
    const onGoWishList = () => {
        useCustomRoute(dispatch, PageList.WISHLIST.SERVER);
    };

    const onGoMailbox = () => {
        useCustomRoute(dispatch, PageList.MAIL_BOX.SERVER);
    };

    const [isShowDrop, setIsShowDrop] = useState('block');
    const [cartRef, isHovered] = useHover();
    return (
        <div className="d-flex top-menu" onClick={closeSearchInput} style={{'--dropDownMenuDisplay':isShowDrop}}>
            <div className="px-2 d-flex user-menu-top-header dropdown">
                <span className="d-center">
                    {isLogin ? (
                        <>
                            <Display>
                                <span
                                    className="hover-color-svg"
                                    onClick={onGoProfile}>
                                    <IconUser fontSize={18} />
                                </span>
                            </Display>
                            <Display mobile={true}>
                                <span className="hover-color-svg" onClick={() => setIsShowDrop('block')}>
                                    <IconUser fontSize={18} />
                                </span>
                            </Display>
                        </>
                    ) : (
                        <span className="hover-color-svg" onClick={() => setIsShowDrop('block')}>
                            <IconUser fontSize={18}/>
                        </span>
                    )}

                    {!isLogin && (
                        <ul className="dropdown-menu">
                            <li>
                                <span
                                    className="dropdown-item align-items-end"
                                    onClick={onGoSignIn}>
                                    <div
                                        style={{
                                            flex: 1,
                                            border: '1px solid #707070',
                                            height: 39,
                                        }}>
                                        <ButtonLight
                                            className="w-100"
                                            title={'Đăng nhập'}
                                        />
                                    </div>
                                </span>
                            </li>
                            <li>
                                <span
                                    className="dropdown-item align-items-start"
                                    onClick={onGoSignUp}>
                                    <div
                                        style={{
                                            flex: 1,
                                            marginBottom: 5,
                                            height: 39,
                                        }}>
                                        <ButtonMain
                                            className="w-100"
                                            title={'Đăng ký'}
                                        />
                                    </div>
                                </span>
                            </li>
                        </ul>
                    )}
                    {isLogin && (
                        <ul
                            className="dropdown-menu"
                            style={{
                                height: 'fit-content',
                                width: 325,
                                right: -95,
                            }}>
                            <li className="d-center w-100">
                                <span
                                    className="align-items-center d-center w-100"
                                    style={{
                                        height: 115,
                                        borderBottom: '1px solid #70707033',
                                    }}>
                                    <div
                                        className="d-center flex-column"
                                        style={{ padding: '20px 0 0' }}>
                                        <img
                                            style={{ width: 55 }}
                                            src={userProfile?.Avatar}
                                        />
                                        <div
                                            className="d-center"
                                            style={{
                                                color: '#333333',
                                                fontWeight: 400,
                                                fontSize: 16,
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                textTransform: 'uppercase',
                                                lineHeight: '19px',
                                            }}>
                                            {userProfile?.DisplayName}
                                        </div>
                                    </div>
                                </span>
                            </li>
                            <li className="d-center w-100">
                                <div
                                    className="align-items-center d-center flex-column w-100"
                                    style={{
                                        borderBottom: '1px solid #70707033',
                                    }}>
                                    <span
                                        className="w-100"
                                        onClick={onGoProfile}>
                                        <div
                                            className="d-center pointer"
                                            style={{
                                                color: '#333333',
                                                fontWeight: 400,
                                                fontSize: 16,
                                                paddingTop: 10,
                                                lineHeight: '19px',
                                            }}>
                                            <span
                                                className="w-100 d-center top-menu-hover"
                                                style={{ height: 39 }}>
                                                Thông tin cá nhân
                                            </span>
                                        </div>
                                    </span>
                                    <span className="w-100" onClick={gotoOrder}>
                                        <div
                                            className="d-center pointer"
                                            style={{
                                                color: '#333333',
                                                fontWeight: 400,
                                                fontSize: 16,
                                                paddingBottom: 10,
                                                lineHeight: '19px',
                                            }}>
                                            <span
                                                className="w-100 d-center top-menu-hover"
                                                style={{ height: 39 }}>
                                                Quản lý đơn hàng
                                            </span>
                                        </div>
                                    </span>
                                </div>
                            </li>
                            <li className="d-center w-100">
                                <span
                                    className="align-items-center d-center w-100"
                                    style={{ padding: 0, height: 60 }}
                                    onClick={onGoSignOut}>
                                    <div
                                        className="d-center w-100 pointer"
                                        style={{
                                            color: '#333333',
                                            fontWeight: 400,
                                            fontSize: 16,
                                        }}>
                                        <span
                                            className="w-100 d-center top-menu-hover logout-hover"
                                            style={{ height: 39 }}>
                                            Đăng xuất
                                        </span>
                                    </div>
                                </span>
                            </li>
                        </ul>
                    )}
                </span>
            </div>
            <div className={`hover-color-svg px-2 d-none d-lg-flex `}>
                <span className="d-center" onClick={onGoMailbox}>
                    <IconMail fontSize={18} />
                </span>
            </div>
            <div className={`hover-color-svg px-2 d-none d-lg-flex `}>
                <span className="d-center" onClick={onGoWishList}>
                    <IconHeart fontSize={18} />
                </span>
            </div>
            {isLogin && (
                <div className="position-relative d-center wrap-cart dropdown" >
                    <div className="icon_menu px-lg-2 h-100 d-center menu-cart-header" ref={cartRef}>
                        <span className="position-relative" >
                            <span
                                title={intl.formatMessage({
                                    id: 'common.cart',
                                })}
                                className="d-flex justify-content-center align-items-center position-relative">
                                <span
                                    className="hover-color-svg d-center"
                                    onClick={gotoCart2}>
                                    <IconCart fontSize={18} />
                                </span>
                                <span
                                    className="badge badge-dark badge-cart"
                                    style={{
                                        position: 'absolute',
                                        right: '-50%',
                                        top: '-50%',
                                        background:
                                            AppConfig.APP_CART_BADGE_BG_COLOR,
                                        color: AppConfig.APP_CART_BADGE_TEXT_COLOR,
                                    }}>
                                    {quantity}
                                </span>
                            </span>
                            <div>
                                <TopCart
                                    showCart={isHovered}
                                    carts={carts}
                                    total={total}
                                    gotoCart={gotoCart}
                                    gotoOrder={gotoOrder}
                                />
                            </div>
                        </span>
                    </div>
                </div>
            )}
            {!isLogin && (
                <div className="px-2 d-flex user-menu-top-header dropdown">
                    <span className="d-center">
                        <div className="position-relative" style={{ top: 4 }}>
                            <span
                                className="hover-color-svg"
                                onClick={gotoCart2}>
                                {/* <Image
                                    style={{ width: 20 }}
                                    src={`/images/icon/cart-top-menu.svg`}
                                /> */}
                                <IconCart fontSize={18} />
                            </span>
                            <span
                                className="badge badge-dark badge-cart"
                                style={{
                                    position: 'absolute',
                                    right: '-50%',
                                    top: '-40%',
                                    background:
                                        AppConfig.APP_CART_BADGE_BG_COLOR,
                                    color: AppConfig.APP_CART_BADGE_TEXT_COLOR,
                                }}>
                                {quantity}
                            </span>
                        </div>
                        <ul className="dropdown-menu account-menu-cart">
                            <li>
                                <span
                                    className="dropdown-item align-items-end"
                                    onClick={onGoSignIn}>
                                    <div
                                        style={{
                                            flex: 1,
                                            border: '1px solid #707070',
                                            height: 39,
                                        }}>
                                        <ButtonLight
                                            className="w-100"
                                            title={'Đăng nhập'}
                                        />
                                    </div>
                                </span>
                            </li>
                            <li>
                                <span
                                    className="dropdown-item align-items-start"
                                    onClick={onGoSignUp}>
                                    <div
                                        style={{
                                            flex: 1,
                                            marginBottom: 5,
                                            height: 39,
                                        }}>
                                        <ButtonMain
                                            className="w-100"
                                            title={'Đăng ký'}
                                        />
                                    </div>
                                </span>
                            </li>
                        </ul>
                    </span>
                </div>
            )}
        </div>
    );
};
TopMenu.propTypes = {};
TopMenu.defaultProps = {
    carts: [],
    count_unread: 0,
    notifications: [],
};
export default TopMenu;
