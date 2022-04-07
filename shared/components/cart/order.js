import constants from '@spo/config/constants';
import useAlert from '@spo/lib/use-alert';
import useCustomRoute from '@spo/lib/use-custom-route';
import CartActions from '@spo/redux/cart/action';
import React from 'react';
import Currency from 'react-currency-formatter';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import * as ga from '@spo/lib/ga';
import { Router } from '@spo/routes';
import $ from 'jquery';
import PageList from '../../config/PageList';
import ButtonMain from '../common/button-main';
import Utils from '../../utils/utils';
import AppConfig from '../../config/AppConfig';
/**
 * ****************************************************************************
 * HaiDT Order CODE
 * order.js
 *
 * description		:
 * created at		:	2020-11-23
 * created by		:	HaiDT
 * package			:	spo\shared\components\cart\order.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
export default function Order(props) {
    const dispatch = useDispatch();
    const onGoToOrder = () => {
        if (props.checkedCart.length > 0) {
            let newCartSubmit = [];
            props.checkedCart.forEach((item, i) => {
                let indexCart = props.carts.findIndex(
                    (x) =>
                        x.ProductId == item.ProductId &&
                        x.ColorId == item?.ColorId &&
                        x.SizeId == item?.SizeId
                );
                if (indexCart != -1) {
                    newCartSubmit.push({
                        ProductId: item?.ProductId,
                        ColorId: item?.ColorId,
                        SizeId: item?.SizeId,
                        Quantity: props.carts[indexCart]?.Quantity,
                        MinPrice: props.carts[indexCart]?.MinPrice,
                    });
                }
            });
            dispatch({
                type: CartActions.CREATE_TEMP_ORDER,
                data: {
                    RequestFrom: 3,
                    Carts: newCartSubmit,
                },
                callback: {
                    success: (res) => {
                        localStorage.setItem(
                            'checkedCarts',
                            JSON.stringify(newCartSubmit)
                        );
                       
                        useCustomRoute(dispatch, PageList.ORDER.SERVER);
                    }, 
                    fail: ()=>{
                        dispatch({
                            type: CartActions.CLEAR_CART_CHECKED
                        });
                    }
                },
            });
        } else {
            $('.cart_leftside').addClass('ani_shake');
            setTimeout(() => {
                $('.cart_leftside').removeClass('ani_shake');
            }, 500);
            props.setErrorNoItem(true);
        }
    };
    return (
        <div className="w-100 order bg-white">
            <div className="d-flex flex-row justify-content-between price">
                <div
                    style={{ color: '#333333', fontSize: 16, fontWeight: 400 }}
                >
                    <FormattedMessage id="common.temporary_charge" />
                </div>
                <div className="sub-number cart-price">
                    <Currency
                        quantity={props.total}
                        style={{
                            color: '#FF2C00',
                            fontSize: 20,
                            fontWeight: 500,
                        }}
                        currency="VND"
                        pattern="##,### !"
                        symbol=""
                    />
                    <span
                        style={{
                            color: '#FF2C00',
                            fontSize: 15,
                            fontWeight: 500,
                        }}
                    >
                        VND
                    </span>
                </div>
            </div>
            <div className="wrap-btn">
                <ButtonMain
                    className="w-100 button-order"
                    title="Mua hàng"
                    fontSize={16}
                    onClick={() => {
                        if(!AppConfig.IS_VERIFY_PHONE && AppConfig.ACCESS_TOKEN){
                            Utils.showPopupRequestVerifyPhone()
                        }else{
                            onGoToOrder()
                        }
                    }}
                />
                {props.errorNoItem && (
                    <p style={{ color: '#FF2C00' }}>
                        Vui lòng chọn sản phẩm để đặt hàng
                    </p>
                )}
            </div>
        </div>
    );
}
