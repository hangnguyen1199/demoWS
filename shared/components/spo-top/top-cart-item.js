import EmptyRow from '@spo/components/common/empty-row';
import QuantityBox from '@spo/components/item/quantity-box';
import { PropTypes } from 'prop-types';
import React from 'react';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Image from '@spo/components/common/image';
import Link from 'next/link';
import Utils from './../../utils/utils';
import $ from 'jquery'

/**
 * ****************************************************************************
 * HaiDT TopCartItem CODE
 * top-cart-item.js
 *
 * description		:
 * created at		:	2021-11-11
 * created by		:	HaiDT
 * package			:	spo\shared\components\spo-top\top-cart-item.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */

const TopCartItem = (props) => {
    const { carts } = props;
    const dispatch = useDispatch();
    //----------------------------------------------
    // Function
    //----------------------------------------------

    /**
     * Sự kiện xóa item giỏ hàng
     *
     * Author : HaiDT - 2021-11-11 - create
     * @return {void}
     */
    const onRemove = (item) => {
        props.onRemove(item);
    };
    /**
     * Sự kiện thay đổi số lượng trên giỏ hàng
     *
     * Author : HaiDT - 2021-11-11 - create
     * @return {void}
     */
    const onChangeQuantity = (product, val) => {
        product.Quantity = parseInt(val, 10);
        props.onChangeQuantity(product);
    };
    const getHeight = () => {
        return Math.round(window.innerHeight) - ($('.sticky-top').height() + $('.header-title-cart-item').height() + $('.total').height() + 100);
    }
    return (
        <>
            {carts.length == 0 ? (
                <EmptyRow width={100} />
            ) : (
                <ul style={{ maxHeight: getHeight() }} className="mini-products-list">
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
                                                        className={`pointer square-container ${
                                                            cart.QuantityInBranch <
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
                                                        onRemove(cart)
                                                    }>
                                                    <i
                                                        className="anm anm-times-l"
                                                        aria-hidden="true"></i>
                                                </a>
                                                <Link
                                                    prefetch={false}
                                                    href="/item/[slug]"
                                                    as={`/item/${cart.Slug}`}>
                                                    <a className="pName link-hover">
                                                        {cart.Name}
                                                    </a>
                                                </Link>
                                                <div className="variant-cart pt-2">
                                                    {cart.SKU}
                                                </div>
                                                <div className="variant-cart pt-2 d-flex">
                                                    <div>
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
                                                    <div>
                                                        Size: {cart.SizeName}
                                                    </div>
                                                </div>
                                                <div className="py-2">
                                                    <QuantityBox
                                                        // disabled={
                                                        //     cart.QuantityInBranch <
                                                        //     cart.Quantity
                                                        // }
                                                        size={20}
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
                                                                <span className="currency fontsize9">
                                                                    VND
                                                                </span>
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
            )}
        </>
    );
};
TopCartItem.propsTypes = {
    carts: PropTypes.array,
};
TopCartItem.defaultProps = {
    carts: [],
};
export default TopCartItem;
