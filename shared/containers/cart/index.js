import CartActions from '@spo/redux/cart/action';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import LeftSide from './components/left-side';
import RightSide from './components/right-side';
import Bottom from '../item-detail/components/bottom';
import BreadCrumb from './../../components/common/breadcrumb';
import Header from '@spo/components/spo-layout/header';
import HomeActions from '@spo/redux/home/action';
import constants from '../../config/constants';

const CartContainer = (props) => {
    const data_bread_crumb = [
        { name: 'Trang chủ', path_name: '/' },
        { name: 'Giỏ hàng', path_name: 'cart' },
    ];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    const [errorNoItem, setErrorNoItem] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem('checkedCarts');
        dispatch({
            type: HomeActions.LOAD_MAY_BE_YOU_CARE_PRODUCT,
            data: {
                Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_CARE,
            },
        });
        return ()=>{
            dispatch({type: CartActions.CLEAR_CART_CHECKED})
        }
    }, []);
    return (
        <div className="bg-white cart-detail">
            <BreadCrumb data={breadcrum} className="border-bottom" />

            <div className="px-0">
                <div
                    className="row mx-0 pd-lr-common"
                    style={{ paddingTop: 20 }}>
                    <div className="col-lg-8 col-12 px-0 cart-left-side-block">
                        <div className=''>
                            <LeftSide setErrorNoItem={setErrorNoItem} />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 px-0 cart-right-side-block">
                        <div className='cart-right-side-block-detail'>
                            <div style={{ boxShadow: '3px 3px 6px #0000000D'}}>
                                <RightSide
                                    errorNoItem={errorNoItem}
                                    setErrorNoItem={setErrorNoItem}
                                />
                            </div>
                        </div>
                    </div>
                    <Bottom />
                </div>
            </div>
        </div>
    );
};

export default CartContainer;
