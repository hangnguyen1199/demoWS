import Header from '@spo/components/spo-layout/header';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Bottom from '../item-detail/components/bottom';
import BreadCrumb from '@spo/components/common/breadcrumb';
import RightSide from './components/right-side';
import AuthActions from '../../../redux/auth/action';
import MasterActions from '../../../redux/master/action';
import VerticalTab from './../../components/spo-layout/vertical-tab';
import Display from '../../components/common/display';

const AccountInfoContainer = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: AuthActions.GET_USER_PROFILE });
        dispatch({ type: MasterActions.GET_PROVINCE_MASTER });
    }, []);

    const data_bread_crumb = [
        { name: 'Trang chủ', path_name: '/' },
        { name: 'Tài khoản', path_name: '/' },
    ];
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    return (
        <div>
            <BreadCrumb data={breadcrum} />
            <div className="bg-white account-info">
                <div className="px-0">
                    <div className="page-body">
                        <Display>
                            <div
                                className="col-12 col-lg-3 px-0">
                                <VerticalTab />
                            </div>
                        </Display>
                        <div
                            className="col-lg-9 col-12 col px-0">
                            <RightSide />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountInfoContainer;
