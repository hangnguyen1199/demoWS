import ButtonDark from '@spo/components/common/button-dark';
import ButtonLight from '@spo/components/common/button-light';
import TopCartItem from '@spo/components/spo-top/top-cart-item';
import useCustomRoute from '@spo/lib/use-custom-route';
import CartActions from '@spo/redux/cart/action';
import React, { useRef } from 'react';
import Currency from 'react-currency-formatter';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import PageList from '../../config/PageList';
import { closeTopCart } from '../../library/helper';
import ButtonMain from '../common/button-main';
import Utils from './../../utils/utils';

const TopCart = (props) => {
    const carts = props.carts;
    const total = props.total;
    const ref = useRef();
    const dispatch = useDispatch();
    const isShowCartTop = useSelector((state) => state.App.isShowCartTop);
    const onChangeQuantity = (item) => {
        dispatch({
            type: CartActions.UPDATE_CART,
            item,
        });
    };
    const onRemoveItem = (item) => {
        dispatch({
            type: CartActions.REMOVE_ITEM_CART,
            item,
        });
    };
    const gotoCart = () => {
        closeTopCart()
        props.gotoCart();
    };
    const gotoOrder = () => {
        localStorage.removeItem('checkedCarts');
        let selected = [];
        let length = carts.length;
        for (let i = 0; i < length; i++) {
            if (carts[i].QuantityInBranch >= carts[i].Quantity) {
                let value = getNeededData(carts[i]);
                selected.push(value);
            }
        }
        if (selected.length > 0) {
            dispatch({
                type: CartActions.UPDATE_CHECKED_CART,
                products: selected,
            });
            dispatch({
                type: CartActions.CREATE_TEMP_ORDER,
                data: {
                    RequestFrom: 3,
                    Carts: selected,
                },
                callback: {
                    success: (res) => {
                        localStorage.setItem(
                            'checkedCarts',
                            JSON.stringify(selected),
                        );
                        // Router.pushRoute('/order');
                        useCustomRoute(dispatch, PageList.ORDER.SERVER);
                        closeTopCart()
                    },
                },
            });
        } else {
            Utils.alertPopup("Sản phẩm trong giỏ không hợp lệ")
        }
    };
    const getNeededData = (item) => {
        return {
            ProductId: item.ProductId,
            ColorId: item.ColorId,
            SizeId: item.SizeId,
            Quantity: item.Quantity,
            MinPrice: item.MinPrice,
        };
    };
    return (
        <span className="">
            <div
                ref={ref}
                className={`header-cart header-cart-height  block block-cart  ${(props?.showCart || isShowCartTop) ? '_force_show_cart' : ''
                }`}
            >
                <div
                    className="d-center header-title-cart-item"
                    style={{ height: 50, borderBottom: '1px inset', color: '#000000' }}>
                    Giỏ hàng
                    {/* <Display mobile={true}>
                        <div
                            className="close header-cart-close-mobile"
                            onClick={onCloseCart}>
                            <IconX />
                        </div>
                    </Display> */}
                </div>
                <TopCartItem
                    carts={carts}
                    onRemove={onRemoveItem}
                    onChangeQuantity={onChangeQuantity}
                />
                <div className="total">
                    <div className="total-in">
                        <span className="label d-start"></span>
                        <span className="label d-start">
                            <FormattedMessage id="common.temporary_charge" />
                        </span>
                        <span className="product-price">
                            <span className="money fontsize14">
                                <Currency
                                    quantity={total}
                                    currency="VND"
                                    pattern="##,### !"
                                    symbol=""
                                />
                                <span className="fontsize12">VND</span>
                            </span>
                        </span>
                    </div>
                    <div className="buttonSet text-center">
                        <div
                            style={{
                                flex: 1,
                                border: '1px solid #707070',
                                height: 39,
                            }}>
                            <ButtonLight
                                className="w-100"
                                onClick={gotoCart}
                                title={<FormattedMessage id="cart.see_cart" />}
                            />
                        </div>
                        <div style={{ width: 10 }}></div>
                        <div style={{ flex: 1, height: 39, marginTop: 5 }}>
                            <ButtonMain
                                className="w-100 btn-none-border"
                                onClick={gotoOrder}
                                title={
                                    <FormattedMessage id="common.checkout" />
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </span>
    );
};

export default TopCart;
