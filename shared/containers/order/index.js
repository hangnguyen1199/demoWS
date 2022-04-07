import HomeActions from '@spo/redux/home/action';
import MasterActions from '@spo/redux/master/action';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../../config/constants';
import Bottom from '../item-detail/components/bottom';
import BreadCrumb from './../../components/common/breadcrumb';
import LeftSide from './components/left-side';
import RightSide from './components/right-side';
import AppConfig from './../../config/AppConfig';
import OrderSyncContainer from '../order-sync';


const OrderContainer = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch({ type: CartActions.LOAD_CART });
        dispatch({ type: MasterActions.GET_PROVINCE_MASTER });
        dispatch({
            type: HomeActions.LOAD_MAY_BE_YOU_CARE_PRODUCT,
            data: {
                Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_CARE,
            },
        });
    }, []);

    const data_bread_crumb = [
        { name: 'Trang chủ', path_name: '/' },
        { name: 'Giỏ hàng', path_name: 'cart' },
        { name: 'Mua hàng', path_name: 'order' },
    ];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    const { data } = useSelector(state => state.Cart)
    return (
        <>
            {
                AppConfig.ACCESS_TOKEN ?
                    <div className="bg-white order-container">
                        {/* <BreadCrumb data={breadcrum} /> */}
                        <div className="px-0 wrap_address">
                            <div className="row pd-lr-common order-master-component ml-0 mr-0">
                                <div className="col-12 col-lg-8 px-0 ">
                                    <LeftSide />
                                </div>
                                <div className="col-12 col-lg-4 px-0 pl-lg-4">
                                    <RightSide />
                                </div>
                            </div>
                        </div>
                    </div>
                    : <OrderSyncContainer />
            }
        </>
    );
};

export default OrderContainer;
