import WishlistActions from '@spo/redux/wishlist/action';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '@spo/components/spo-layout/header';
import SubTitle from './../../components/utility/sub-title';
import Bottom from './components/bottom';
import Top from './components/top';
import BreadCrumb from './../../components/common/breadcrumb';
import Utils from '../../../shared/utils/utils';
import HomeActions from '@spo/redux/home/action';
import constants from '../../config/constants';
/**
* ****************************************************************************
* HaiDT Index CODE
* index.js 
* 
* description		:	
* created at		:	2021-11-27 
* created by		:	HaiDT 
* package			:	spo\shared\containers\wishlist\index.js  
* copyright			:	Copyright (c) HaiDT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
const WishlistContainer = (props) => {
    let isLogged = Utils.isLogged();
    const dispatch = useDispatch();
    const data_bread_crumb = [{ name: 'Trang chủ', path_name: '/' }, { name: 'Đã thích', path_name: '/' }];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() =>{
        dispatch({
            type: HomeActions.LOAD_MAY_BE_YOU_CARE_PRODUCT,
            data: {
                Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_CARE,
            },
        });
    },[])
    useEffect(() => {
        setIsLogin(isLogged);
    }, [isLogged]);
    return (
        <div>
            {/* <Header /> */}
            <BreadCrumb data={breadcrum} />
            {!isLogin && (
                <SubTitle title="Danh sách yêu thích" />
            )}
            {isLogin && (
                <Top/>
            )}
            <Bottom />
        </div>
    );
};

export default WishlistContainer;
