import IconCardChecklist from '@spo/components/common/icon-card-checklist';
import IconLogout from '@spo/components/common/icon-logout';
import { IconShop } from '@spo/components/common/icon-shop';
import IconUser from '@spo/components/common/icon-user';
import Image from '@spo/components/common/image';
import constants from '@spo/config/constants';
import useCustomRoute from '@spo/lib/use-custom-route';
// import OrderManagementActions from '@spo/redux/order-management/action';
// import UserLoggedActions from '@spo/redux/user-logged/action';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
// import WishlistActions from '@spo/redux/wishlist/action';
import Link from 'next/link';
/**
 * ****************************************************************************
 * DUNGNT UserInfo CODE
 * user-info.js
 *
 * description		:
 * created at		:	2020-08-01
 * created by		:	DungNT
 * package			:	spo\shared\components\spo-top\user-info.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function UserInfo(props) {
    const { user } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    //----------------------------------------------
    // Function
    //----------------------------------------------
    /**
     * Khi nhấn nút đăng xuất
     *
     * Author : DungNT - 2020-08-23 - create
     * @return {void}
     */
    const onLogout = () => {
        dispatch({ type: UserLoggedActions.LOGOUT });
        router.push('/').then(() => {
            window.scroll({
                top: 0,
                left: 0,
            });
        });
    };
    /**
     * Khi nhấn nút thông tin cá nhân
     *
     * Author : DungNT - 2020-08-23 - create
     * @return {void}
     */
    const onGoToUserProfile = () => {
        useCustomRoute(dispatch, 'user-profile', { tab: 1 });
    };

    const onGoToOrderHistory = () => {
        useCustomRoute(dispatch, 'user-profile', { tab: 2 });
    };
    const onGoToShopManagement = () => {
        // useCustomRoute(dispatch, "quan-ly-shop")
        window.open(`/quan-ly-shop`, '_ blank');
    };
    const onDowloadOrderForSale = () => {
        dispatch({ type: OrderManagementActions.EXPORT_ORDER_FOR_SALE });
    };
    const onDowloadWishlistForSale = () => {
        dispatch({ type: WishlistActions.EXPORT_WISHLIST_FOR_SALE });
    };
    return (
        <div className="user-info d-center bg-hover pointer px-2">
            <div className="avatar">
                <Image
                    title="avatar user outfiz"
                    seo="avatar-outfiz"
                    defaultImage="/images/config/user_default.jpg"
                    className="h-100 w-100"
                    src={user.avatar}
                />
            </div>
            <div className="px-2 text-truncate" style={{ maxWidth: 150 }}>
                {user.display_name}
            </div>
            <div className="wrap-menu ">
                <div className="menu">
                    <Link href={`/user-profile?tab=1`}>
                        <a className="option bg-hover d-start">
                            <div>
                                <IconUser />
                            </div>
                            <div className="pl-2">Thông tin cá nhân </div>
                        </a>
                    </Link>
                    {user.role_shop == constants.R002.SHOP_ADMIN.CODE && (
                        <Link href="/quan-ly-shop">
                            <a
                                target="_blank"
                                className="option bg-hover d-start">
                                <div>
                                    <IconShop />
                                </div>
                                <div className="pl-2">Quản lí cửa hàng </div>
                            </a>
                        </Link>
                    )}
                    <Link href={`/user-profile?tab=2`}>
                        <a className="option bg-hover d-start">
                            <div>
                                <IconCardChecklist />
                            </div>
                            <div className="pl-2">Đơn hàng của tôi </div>
                        </a>
                    </Link>
                    <div className="option d-start" onClick={onLogout}>
                        <div>
                            <IconLogout />
                        </div>
                        <div className="pl-2">Đăng xuất</div>
                    </div>
                    {(user.user_id == 225 || user.user_id == 1) && (
                        <>
                            <div
                                className="option d-start"
                                onClick={onDowloadOrderForSale}>
                                <div>
                                    <IconLogout />
                                </div>
                                <div className="pl-2">For Asia - Order</div>
                            </div>
                            <div
                                className="option d-start"
                                onClick={onDowloadWishlistForSale}>
                                <div>
                                    <IconLogout />
                                </div>
                                <div className="pl-2">For Asia - Wishlist</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
UserInfo.propTypes = {
    user: PropTypes.object,
};
UserInfo.defaultProps = {
    user: {},
};
export default UserInfo;
