import { PropTypes } from 'prop-types';
import React from 'react';
import Currency from 'react-currency-formatter';
import { useIntl } from 'react-intl';
import QuantityBox from './../item/quantity-box';
import Product from './product';
import CheckBox from './../common/check-box';
import Image from '@spo/components/common/image';
import Utils from './../../utils/utils';
import IconCartDelete from '../common/icon-cart-delete';
/**
 * ****************************************************************************
 * HaiDT RowCart CODE
 * row-cart.js
 *
 * description		:
 * created at		:	2020-08-19
 * created by		:	HaiDT
 * package			:	spo\shared\components\cart\row-cart.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RowCart(props) {
    const { item, checkedItems } = props;
    const intl = useIntl();
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onChangeQuantity = (product, val) => {
        product.Quantity = parseInt(val, 10);
        props.onChangeQuantity(product);
    };
    const onRemoveItem = (e) => {
        props.onRemoveItem(e);
    };
    const onCheckedItem = (e) => {
        props.onCheckedItem(e);
    };
    const getNeededData = (e) => {
        return {
            ProductId: e.ProductId,
            ColorId: e.ColorId,
            SizeId: e.SizeId,
            Quantity: e.Quantity,
        };
    };
    const isCheckedItem = (e) => {
        return (
            checkedItems &&
            checkedItems.findIndex(function (value) {
                return (
                    value.ProductId === e.ProductId &&
                    value.ColorId === e.ColorId &&
                    value.SizeId === e.SizeId
                );
            }) > -1
        );
    };
    return (
        <tr className={`row-cart position-relative item`}>
            {!props.readonly && (
                <td style={{ width: 50 }}>
                    <div className="w-100 h-100">
                        <CheckBox
                            className="cart-checkbox"
                            type="checkbox"
                            value="true"
                            onChange={(e) => onCheckedItem(item)}
                            checked={isCheckedItem(item)}
                            disabled={item.QuantityInBranch < item.Quantity}
                        />
                    </div>
                </td>
            )}
            <td className="position-relative">
                <div>
                    <Product item={item} />
                    {!props.readonly && Utils.renderWarningText(item.QuantityInBranch, item.Quantity,"text-left mt-2")}
                </div>
            </td>
            <td className="product-price ">
                {item.MaxPrice != item.MinPrice && (
                    <span className="old-price mr-1">
                        <span style={{ fontSize: 14, fontWeight: 400 }}>
                            <Currency
                                quantity={item.MaxPrice || item.SalePrice}
                                currency="VND"
                                pattern="##,### !"
                                symbol=""
                            />
                        </span>
                    </span>
                )}
                <span className="sale-price product-price-row">
                    <span style={{ fontSize: 16, fontWeight: 400 }}>
                        <Currency
                            quantity={item.MinPrice || item.SalePrice}
                            currency="VND"
                            pattern="##,### !"
                            symbol=""
                        />
                    </span>
                    <span
                        className="currency"
                        style={{ fontSize: 11, fontWeight: 400 }}>
                        VND
                    </span>
                </span>
            </td>
            <td className="wrap_quantity_cart wrap_quantity_cart-row ">
                <div
                    className={`${
                        item.QuantityInBranch == 0 ? 'cart_disabled' : ''
                    }`}>
                    {!props.readonly && (
                        <QuantityBox
                            size={33}
                            value={item.Quantity}
                            max={item.QuantityInBranch}
                            update={(val) => onChangeQuantity(item, val)}
                        />
                    )}
                    {props.readonly && item.Quantity}
                </div>
            </td>
            {!props.readonly && (
                <td width="50px">
                    <span className="hover-color-svg" onClick={(e) => onRemoveItem(item)}>
                        <IconCartDelete/>
                    </span>
                </td>
            )}
            <td width="160px">
                <span className="product-price-row">
                    <span style={{ fontSize: 16, fontWeight: 400 }}>
                        <Currency
                            quantity={
                                Number.parseFloat(
                                    item.MinPrice || item.SalePrice,
                                ) * item.Quantity
                            }
                            currency="VND"
                            pattern="##,### !"
                            symbol=""
                        />
                    </span>
                    <span
                        className="currency"
                        style={{ fontSize: 11, fontWeight: 400 }}>
                        VND
                    </span>
                </span>
            </td>
        </tr>
    );
}
RowCart.propsTypes = {
    item: PropTypes.object,
};
RowCart.defaultProps = {
    item: {},
};
export default RowCart;
