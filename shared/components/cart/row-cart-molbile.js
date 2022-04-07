import Image from '@spo/components/common/image';
import { PropTypes } from 'prop-types';
import React from 'react';
import CheckBox from './../common/check-box';
import ProductMobile from './product-mobile';
import IconBin from '../common/icons/icon-bin'

/**
 * ****************************************************************************
 * DUNGNT RowCartMolbile CODE
 * row-cart-molbile.js
 *
 * description		:
 * created at		:	2020-08-19
 * created by		:	DungNT
 * package			:	spo\shared\components\cart\row-cart-molbile.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RowCartMobile(props) {
    const { item, checkedItems } = props;
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
            ProductId: item.ProductId,
            ColorId: item.ColorId,
            SizeId: item.SizeId,
            Quantity: item.Quantity,
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
    const renderWarningText = () => {
        if (item.QuantityInBranch == 0) {
            return (
                <div
                    className="text-right"
                    style={{ color: '#FF2C00', fontWeight: 400, fontSize: 12 }}>
                    Sản phẩm này hiện không còn hàng
                </div>
            );
        } else if (item.QuantityInBranch < item.Quantity) {
            return (
                <div
                    className="text-right"
                    style={{ color: '#FF2C00', fontWeight: 400, fontSize: 12 }}>
                    Số lượng trong kho còn {item.QuantityInBranch}
                </div>
            );
        } else if (item.QuantityInBranch == item.Quantity) {
            return (
                <div
                    className="text-right"
                    style={{ color: '#FF2C00', fontWeight: 400, fontSize: 12 }}>
                    Đã đạt đến số lượng mua tối đa cho phép của sản phẩm này.
                </div>
            );
        }
    };
    return (
        <div className="_wrap_row_mobile_cart">
            <div className="wrap_row_mobile_cart">
                {!props.readonly && (
                    <div className="h-100">
                        <CheckBox
                            className="cart-checkbox"
                            type="checkbox"
                            value="true"
                            onChange={(e) => onCheckedItem(item)}
                            checked={isCheckedItem(item)}
                            disabled={item.QuantityInBranch < item.Quantity}
                        />
                    </div>
                )}
                <ProductMobile
                    item={item}
                    onChangeQuantity={onChangeQuantity}
                    readonly={props.readonly}
                />

                {!props.readonly && (
                    <span
                        className="ml-auto"
                        onClick={(e) => onRemoveItem(item)}>
                        {/* <Image
                            className="hover-color-svg"
                            style={{ width: 15 }}
                            src={`/images/icon/cart_bin.svg`}
                        /> */}
                        <IconBin/>
                    </span>
                )}
            </div>
            {!props.readonly && renderWarningText()}
        </div>
    );
}
RowCartMobile.propsTypes = {
    item: PropTypes.object,
};
RowCartMobile.defaultProps = {
    item: {
        item_image_link: '',
        item_name: '',
        color_name: '',
        size_name: '',
        quantity: 1,
        sale_price: 0,
    },
};
export default RowCartMobile;
