import CartActions from '@spo/redux/cart/action';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PackageCart from '../../../components/cart/package-cart';
import CheckBox from './../../../components/common/check-box';

let _ = require('lodash');

/**
 * ****************************************************************************
 * HaiDT LeftSide CODE
 * left-side.js
 *
 * description		:
 * created at		:	2021-11-23
 * created by		:	HaiDT
 * package			:	spo\shared\containers\cart\components\left-side.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */

function LeftSide(props) {
    const { delivery, setErrorNoItem } = props;
    const dispatch = useDispatch();
    const { loading, data } = useSelector((state) => state.Cart);
    const [totalItem, setTotalItem] = useState(data.cartProducts.length);

    useEffect(() => {
        let quantity = data.cartProducts && data.cartProducts?.reduce((t, q) => t + q.Quantity ,0) || 0;
        setTotalItem(data.cartProducts && data.cartProducts.length);
    }, [data]);
    ///----------------------------------------------
    // Function
    //----------------------------------------------
    /**
     * Khi thay đổi số lượng trên giỏ hàng
     *
     * Author : HaiDT - 2020-08-19 - create
     * @return {void}
     */
    const onChangeQuantity = (item) => {
        dispatch({
            type: CartActions.UPDATE_CART,
            item,
        });
        let selected = [...data.checkedCart];
        let index = selected.findIndex(function (value) {
            return (
                value.ProductId === item.ProductId &&
                value.ColorId === item.ColorId &&
                value.SizeId === item.SizeId
            );
        });
        if (index > -1) {
            selected[index] = getNeededData(item);
        }
        dispatch({
            type: CartActions.UPDATE_CHECKED_CART,
            products: selected,
        });
    };
    /**
     * Sự kiện khi click xóa item
     *
     * Author : DungNT - 2020-08-19 - create
     * @return {void}
     */
    const onRemoveItem = (item) => {
        dispatch({
            type: CartActions.REMOVE_ITEM_CART,
            item,
        });
    };
    /**
     * Sự kiện chọn checkbox
     *
     * Author : QuyPN - 2021-12-21 - create
     * @return {void}
     */
    const onCheckedItem = (item) => {
        let selected = [...data.checkedCart];
        let index = selected.findIndex(function (value) {
            return (
                value.ProductId === item.ProductId &&
                value.ColorId === item.ColorId &&
                value.SizeId === item.SizeId 
                // fix #474 - TrinhDTK
                // && value.Quantity === item.Quantity
            );
        });
        if (index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push(getNeededData(item));
        }
        dispatch({
            type: CartActions.UPDATE_CHECKED_CART,
            products: selected,
        });
        setErrorNoItem(false);
    };
    /**
     * Sự kiện chọn checkbox tất cả
     *
     * Author : QuyPN - 2021-12-21 - create
     * @return {void}
     */
    const onCheckedAllItem = (items) => {
        let selected = [];
        if (!isCheckedAll()) {
            let length = items.length;
            for (let i = 0; i < length; i++) {
                if(items[i].QuantityInBranch >= items[i].Quantity){
                    let value = getNeededData(items[i]);
                    selected.push(value);
                }
            }
        }
        dispatch({
            type: CartActions.UPDATE_CHECKED_CART,
            products: selected,
        });
        setErrorNoItem(false);
    };

    /**
     * Chỉ lấy data cần thiết trong item của cart
     *
     * Author : QuyPN - 2021-12-21 - create
     * @return {void}
     */
    const getNeededData = (item) => {
        return {
            ProductId: item.ProductId,
            ColorId: item.ColorId,
            SizeId: item.SizeId,
            Quantity: item.Quantity,
            MinPrice: item.MinPrice,
        };
    };
    const isCheckedAll = () => {
        return (
            data.checkedCart &&
            data.checkedCart &&
            data.checkedCart.length === data.cartProducts.length &&
            data.cartProducts.length > 0
        );
    };
    return (
        <>
            <div className="cart_leftside">
                <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ height: 39, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #e5e4e4' }}>
                    <div className="">
                        <div className="d-flex align-items-center">
                            <CheckBox
                                type="checkbox"
                                className="_custom_checkbox"
                                value=""
                                id="allCart"
                                onChange={(e) =>
                                    onCheckedAllItem(data.cartProducts)
                                }
                                checked={isCheckedAll()}
                                disabled={data.cartProducts.length == 0}
                            />
                            <span
                                style={{
                                    color: '#333333',
                                    fontSize: 16,
                                    fontWeight: 400,
                                }}
                                htmlFor="allCart">
                                Tất cả
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <span
                            style={{
                                color: '#FF2C00',
                                fontSize: 16,
                                fontWeight: 400,
                            }}>
                            {totalItem} Sản phẩm
                        </span>
                    </div>
                </div>
                <PackageCart
                    items={data.cartProducts}
                    onChangeQuantity={(e) => onChangeQuantity(e)}
                    readonly={false}
                    onRemoveItem={(e) => onRemoveItem(e)}
                    onCheckedItem={(e) => onCheckedItem(e)}
                    checkedItems={data.checkedCart}
                />
            </div>
        </>
    );
}
export default LeftSide;
