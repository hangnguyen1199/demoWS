import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderActions from '@spo/redux/order/action';

import AddressComponent from '../../../components/order/AddressComponent';
import ReduceComponent from '../../../components/order/ReduceComponent';
import FreeshipComponent from '../../../components/order/FreeshipComponent';
import ProductListComponent from '../../../components/order/ProductListComponent';
import TimeComponent from '../../../components/order/TimeComponent';

const LeftSide = (props) => {
    const dispatch = useDispatch();
    const { loading, data } = useSelector((state) => state.Order);
    const { data: cart } = useSelector((state) => state.Cart);
    const { data: auth } = useSelector((state) => state.Auth);
    const [carts, setCarts] = useState([]);

    const GetOrderDetail = () => {
        let details = [];
        if (cart.checkedCart && cart.checkedCart.length > 0) {
            cart.checkedCart.forEach(item => {
                let index = cart.cartProducts.findIndex(function (value) {
                    return value.ProductId === item.ProductId && value.ColorId === item.ColorId && value.SizeId === item.SizeId && value.Quantity === item.Quantity;
                });
                if (index > -1) {
                    details.push(cart.cartProducts[index]);
                }
            });
            return details;
        }
        else {
            let savedCart = localStorage.getItem('checkedCarts');
            let checkedCart = [];
            if (savedCart) {
                checkedCart = JSON.parse(savedCart);
            }
            if (checkedCart.length > 0) {
                checkedCart.forEach(item => {
                    let index = cart.cartProducts.findIndex(function (value) {
                        return value.ProductId === item.ProductId && value.ColorId === item.ColorId && value.SizeId === item.SizeId && value.Quantity === item.Quantity;
                    });
                    if (index > -1) {
                        details.push(cart.cartProducts[index]);
                    }
                });
                return details;
            }
            return [];
        }
    };

    useEffect(() => {
        dispatch({
            type: OrderActions.LOAD_USER_ORDER_ADDRESS
        });
        dispatch({
            type: OrderActions.GET_ORDER_VOUCHER
        });
    }, []);

    useEffect(() => {
        let details = GetOrderDetail();
        setCarts(details);
        if(details.length > 0) {
            let cloneOrder = {...data.order};
            cloneOrder.Carts = details;
            dispatch({
                type: OrderActions.UPDATE_ORDER_VALUES,
                order: cloneOrder
            });
        }
    }, [cart]);

    useEffect(() => {
        if(data.order.Carts && data.order.Carts.length > 0) {
            dispatch({
                type: OrderActions.CALC_ORDER_VALUES,
                order: data.order
            });
        }
    }, [data.order]);

    return (
        <div className="bg-white left-side">
            <AddressComponent 
                privateAddressList={data.userAddress.UserAddresses} 
                privateBranchList={data.userAddress.BranchAddresses} 
                order={data.order}
            ></AddressComponent>
            <ProductListComponent 
                itemList={carts}
            ></ProductListComponent>
            {data.orderValues.RecieveTimes && data.orderValues.RecieveTimes.length > 0 && <TimeComponent
                times={data.orderValues.RecieveTimes}
                order={data.order}
            ></TimeComponent>}
            <FreeshipComponent
                vouchers={data.voucher.ShipmentVouchers}
                order={data.order}
                orderValues={data?.orderValues}
            ></FreeshipComponent>
            <ReduceComponent
                vouchers={data.voucher.NormalVouchers}
                order={data.order}
                profile={auth.User}
                orderValues={data?.orderValues}
                className="pl-0 pr-0"
            ></ReduceComponent>
        </div>
    );
};

export default LeftSide;
