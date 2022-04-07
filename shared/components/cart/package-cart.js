import useWindowSize from '@spo/lib/use-window-size';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import Currency from 'react-currency-formatter';
import { FormattedMessage } from 'react-intl';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Display from '../common/display';
import Divider from './../common/divider';
import IconChevronDown from './../common/icon-chevron-down';
import RowCart from './row-cart';
import RowCartMobile from './row-cart-molbile';
import Image from '@spo/components/common/image';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import { useDispatch } from 'react-redux';
import ButtonMain from '../common/button-main';
/**
 * ****************************************************************************
 * DUNGNT PackageCart CODE
 * package-cart.js
 *
 * description		:
 * created at		:	2020-08-19
 * created by		:	DungNT
 * package			:	spo\shared\components\cart\package-cart.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function PackageCart(props) {
    const dispatch = useDispatch();
    //----------------------------------------------
    // Function
    //----------------------------------------------

    /**
     * Sự kiện khi thay đổi số lượng item
     *
     * Author : DungNT - 2020-08-19 - create
     * @return {void}
     */
    const onChangeQuantity = (product) => {
        props.onChangeQuantity(product);
    };
    /**
     * Sự kiện khi nhấn xóa item
     *
     * Author : DungNT - 2020-08-19 - create
     * @return {void}
     */
    const onRemoveItem = (item) => {
        props.onRemoveItem(item);
    };
    const gotoHome = () => {
        useCustomRoute(dispatch, '/');
    };
    /**
     * Sự kiện chọn checkbox
     *
     * Author : QuyPN - 2021-12-21 - create
     * @return {void}
     */
    const onCheckedItem = (item) => {
        props.onCheckedItem(item);
    };
    return (
        <div className={`package-cart bg-white active`}>
            <div className={`wrap_cart `}>
                <Display>
                    <table className="table">
                        <tbody>
                            <tr className="item">
                                {!props.readonly && <td></td>}
                                <td className="text-left">
                                    <div
                                        style={{
                                            color: '#333333',
                                            fontSize: 16,
                                            fontWeight: 500,
                                            paddingLeft: 40,
                                        }}>
                                        Sản phẩm
                                    </div>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            color: '#333333',
                                            fontSize: 16,
                                            fontWeight: 500,
                                        }}>
                                        Giá
                                    </div>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            color: '#333333',
                                            fontSize: 16,
                                            fontWeight: 500,
                                        }}>
                                        Số lượng
                                    </div>
                                </td>
                                {!props.readonly && (
                                    <td>
                                        <div
                                            style={{
                                                color: '#333333',
                                                fontSize: 16,
                                                fontWeight: 500,
                                            }}>
                                            Xoá
                                        </div>
                                    </td>
                                )}
                                <td>
                                    <div
                                        style={{
                                            color: '#333333',
                                            fontSize: 16,
                                            fontWeight: 500,
                                        }}>
                                        Tổng tiền
                                    </div>
                                </td>
                            </tr>
                            {props.items?.length > 0 &&
                                props.items?.map((item, index) => (
                                    <RowCart
                                        key={index}
                                        readonly={props.readonly}
                                        onRemoveItem={onRemoveItem}
                                        item={item}
                                        onChangeQuantity={onChangeQuantity}
                                        onCheckedItem={onCheckedItem}
                                        checkedItems={props.checkedItems}
                                    />
                                ))}
                            {props.items?.length == 0 && (
                                <tr>
                                    <td colSpan={6} className="">
                                        <div className="w-100 d-center">
                                            <div
                                                className="d-flex flex-column align-items-center justify-content-center mt-5 cart-empty"
                                                style={{ width: 400 }}>
                                                <div
                                                    style={{
                                                        paddingBottom: 30,
                                                    }}>
                                                    <Image
                                                        style={{ width: 124 }}
                                                        src={`/images/icon/cart_list_empty.svg`}
                                                    />
                                                </div>
                                                <span
                                                    style={{
                                                        paddingBottom: 45,
                                                        color: '#333333',
                                                        fontSize: 16,
                                                        fontWeight: 400,
                                                    }}>
                                                    Chưa có sản phẩm nào trong
                                                    giỏ hàng
                                                </span>
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        height: 39,
                                                        width: 400,
                                                        margin: 'auto',
                                                        paddingBottom: 60,
                                                    }}>
                                                    <ButtonMain
                                                        className="w-100"
                                                        onClick={gotoHome}
                                                        title={
                                                            'Tiếp tục mua sắm'
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Display>
                <Display mobile={true}>
                    <div
                        style={
                            {
                                // border: '1px solid #dee2e6',
                                // borderTopWidth: 0,
                                // borderBottomWidth: 0,
                            }
                        }>
                        <div className="w-100">
                            {/* <Divider /> */}
                            {props.items?.map((item, index) => (
                                <RowCartMobile
                                    key={index}
                                    readonly={props.readonly}
                                    onRemoveItem={onRemoveItem}
                                    item={item}
                                    onChangeQuantity={onChangeQuantity}
                                    onCheckedItem={onCheckedItem}
                                    checkedItems={props.checkedItems}
                                />
                            ))}
                        </div>
                    </div>
                </Display>
            </div>
        </div>
    );
}
PackageCart.propTypes = {
    label: PropTypes.string,
    readonly: PropTypes.bool,
    items: PropTypes.array,
};
PackageCart.defaultProps = {
    label: '',
    item: [],
    readonly: false,
};
export default PackageCart;
