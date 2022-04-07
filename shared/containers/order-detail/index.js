import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetailActions from '@spo/redux/order-detail/action';
import WrapOrderInfo from "./components/wrap-order-detail"
import BreadCrumb from '@spo/components/common/breadcrumb';
import VerticalTab from '@spo/components/spo-layout/vertical-tab';
import WrapOrderInfoReTurn from './components/wrap-order-return';
import { useRouter } from 'next/router';
import Display from '../../components/common/display';
/**
 * ****************************************************************************
 * AnhDT OrderContainer CODE
 * index.js
 *
 * description		:
 * created at		:	2020-07-30
 * created by		:	AnhDT
 * package			:	spo\shared\containers\order\index.js
 * copyright			:	Copyright (c) AnhDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const OrderDetailContainer = (props) => {
    const [selected, setSelected] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: OrderDetailActions.LOAD_ORDER_DETAIL, data: {orderId: props.orderId} });
    }, []);
    const data_bread_crumb = [
        { name: 'Trang chủ', path_name: '/' },
        { name: 'Tài khoản', path_name: '/account' },
    ];
    const router = useRouter();
    const isReturn = router?.query?.isReturn;
    return (
        
        <div className='order-detail'>
            <BreadCrumb data={data_bread_crumb} />
            <div className='pd-lr-common'>
                <div className="row mx-0">
                    <Display>
                        <div className="col-lg-3 col-12 px-0">
                            <VerticalTab index={1} />
                        </div>
                    </Display>
                    <div className="col-lg-9 col-12 px-0">
                        {isReturn ? (
                            <WrapOrderInfoReTurn/>
                        ) : (
                            <WrapOrderInfo/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailContainer;
