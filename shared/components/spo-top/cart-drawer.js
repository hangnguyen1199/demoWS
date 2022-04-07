import EmptyRow from '@spo/components/common/empty-row';
import QuantityBox from '@spo/components/item/quantity-box';
import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Image from '@spo/components/common/image';
import Link from 'next/link';
import Utils from './../../utils/utils';
import $ from 'jquery'
import ButtonLight from '@spo/components/common/button-light';
import { FormattedMessage } from 'react-intl';
import ButtonMain from './../common/button-main';
import IconCloses from '../common/icon-closes';
import PageList from './../../config/PageList';
import { useCustomRoute } from './../../library/use-custom-route';
import { scrollTop, closeTopCart } from '../../library/helper';
import CartActions from '@spo/redux/cart/action';
import EventRegister, { OPEN_DRAWER_CART } from '../../utils/EventRegister';

export default function CartDrawer(props) {
    const [openCart, setOpenCart] = useState(false);
    const carts = props.carts;
    const dispatch = useDispatch();

    const gotoCart = () => {
        useCustomRoute(dispatch, PageList.CART.SERVER, {}, true, null, 1, true);
        scrollTop()
        setOpenCart(false);
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
        setOpenCart(false);
    };

    const onChangeQuantity = (item, val) => {
        item.Quantity = parseInt(val, 10);
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
    const total = carts.reduce(
        (sum, item) => (sum += item.Quantity * item.MinPrice),
        0,
    );

    useEffect(() => {
        EventRegister.on(OPEN_DRAWER_CART, () => {
            setOpenCart(true);
        })
    }, [])
    let height = Math.round(window.innerHeight) - ($('.header-title-cart-item-new').height() + $('.total').height() + 30);
    let quantity = carts && carts?.reduce((t, q) => t + q.Quantity ,0) || 0;
    return (
        <>
            {
                <div className={`cart-new-drawer ${openCart ? 'show ' : ''}`}>
                    <div className={`cart-new-drawer-container ${openCart ? 'show-cart' : ''}`}>
                        <div className='header-title-cart-item-new'>
                            <p className='title-name-header-cart-new'>Giỏ hàng <span>({carts&&carts.length} sản phẩm)</span></p>
                            <span className='close-header-cart-new' onClick={() => setOpenCart(false)}>
                                <IconCloses width={24} />
                            </span>
                        </div>
                        {carts.length == 0 ? (
                            <div style={{ minHeight: `${height}px` }}>
                                <EmptyRow width={100} />
                            </div>
                        ) : (
                            <div style={{ minHeight: `${height}px`,padding : '0px 30px' }}>
                                <ul style={{ minHeight: `${height}px` }} className="mini-products-list">
                                    <TransitionGroup>
                                        {carts.map((cart, index) => (
                                            <CSSTransition
                                                key={index.toString()}
                                                timeout={500}
                                                classNames="item">
                                                <>
                                                    <li className={``} key={cart.ProductId}>
                                                        <div className="d-start-start">
                                                            <Link
                                                                prefetch={false}
                                                                href="/item/[slug]"
                                                                as={`/item/${cart.Slug}`}>
                                                                <a className="col-4 px-0">
                                                                    <div
                                                                        className={`pointer square-container ${cart.QuantityInBranch <
                                                                            cart.Quantity
                                                                            ? 'outstock'
                                                                            : ''
                                                                        }`}>
                                                                        <div
                                                                            className="square"
                                                                            style={{
                                                                                background: `url(${cart.Thumb})`,
                                                                            }}></div>
                                                                    </div>
                                                                </a>
                                                            </Link>

                                                            <div className="product-details col-8 pr-0">
                                                                <a
                                                                    className="remove link-hover"
                                                                    onClick={() =>
                                                                        onRemoveItem(cart)
                                                                    }
                                                                >
                                                                    <i
                                                                        className="anm anm-times-l"
                                                                        aria-hidden="true"></i>
                                                                </a>
                                                                <Link
                                                                    prefetch={false}
                                                                    href="/item/[slug]"
                                                                    as={`/item/${cart.Slug}`}>
                                                                    <a className=" pName-new link-hover">
                                                                        {cart.Name?.toLowerCase()}
                                                                    </a>
                                                                </Link>
                                                                {/* <div className="variant-cart pt-2">
                                                                {cart.SKU}
                                                            </div> */}
                                                                <div className="variant-cart pt-2 d-flex">
                                                                    <div className='p-color-cart-new'>
                                                                        {' '}
                                                                        Màu: {
                                                                            cart.ColorName
                                                                        }{' '}
                                                                    </div>{' '}
                                                                    <div
                                                                        style={{
                                                                            width: 15,
                                                                            textAlign: 'center',
                                                                            color: '#D8D7D7',
                                                                        }}>
                                                                        |
                                                                    </div>{' '}
                                                                    <div className='p-color-cart-new'>
                                                                        Size: {cart.SizeName}
                                                                    </div>
                                                                </div>
                                                                <div className="py-2">
                                                                    <QuantityBox
                                                                        disabled={
                                                                            cart.QuantityInBranch <
                                                                            cart.Quantity
                                                                        }
                                                                        size={25}
                                                                        value={cart.Quantity}
                                                                        max={
                                                                            cart.QuantityInBranch
                                                                        }
                                                                        update={(val) =>
                                                                            onChangeQuantity(
                                                                                cart,
                                                                                val,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="priceRow">
                                                                    <div className="product-price">
                                                                        {cart.MaxPrice !=
                                                                            cart.MinPrice && (
                                                                            <span className="old-price pr-2">
                                                                                <Currency
                                                                                    quantity={Number.parseFloat(
                                                                                        cart.MaxPrice,
                                                                                    )}
                                                                                    currency="VND"
                                                                                    pattern="##,### !"
                                                                                    symbol=""
                                                                                />
                                                                                {/* <span className="currency fontsize9">
                                                                                        VND
                                                                                </span> */}
                                                                            </span>
                                                                        )}
                                                                        <span className="sale-price">
                                                                            <Currency
                                                                                quantity={Number.parseFloat(
                                                                                    cart.MinPrice,
                                                                                )}
                                                                                currency="VND"
                                                                                pattern="##,### !"
                                                                                symbol=""
                                                                            />
                                                                            <span className="currency fontsize9">
                                                                                VND
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {Utils.renderWarningText(
                                                            cart.QuantityInBranch,
                                                            cart.Quantity,
                                                            'text-left mt-2',
                                                        )}
                                                    </li>
                                                </>
                                            </CSSTransition>
                                        ))}
                                    </TransitionGroup>
                                </ul>
                            </div>
                        )}
                        <div className="total ">
                            <div className="total-in-cart-new">
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
                                {/* <div
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
                                <div style={{ width: 10 }}></div> */}
                                <div className='w-100' style={{ flex: 1, height: 39, marginTop: 5 }}>
                                    <ButtonMain
                                        className="w-100 btn-none-border btn-max-cart-100"
                                        // onClick={gotoOrder}
                                        onClick={gotoCart}
                                        title={
                                            <FormattedMessage id="common.checkout" />
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setOpenCart(false)} className='cart-new-drawer-overlay'></div>
                </div>
            }
        </>
    )
}
