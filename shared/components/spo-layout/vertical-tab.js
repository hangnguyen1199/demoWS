import ProgressBar from '@atlaskit/progress-bar';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import _ from 'lodash';
import AuthActions from '../../../redux/auth/action';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { PropTypes } from 'prop-types';
import actions from './../../../redux/user-logged/action';
import InputUpload from './../../containers/account-info/components/input-upload-file';
import PageList from '../../config/PageList';

/**
 * ****************************************************************************
 * AnhDT Vertical Tab CODE
 * vertical-Tab.js
 *
 * description		:
 * created at		:	2021-11-23
 * created by		:	AnhDT
 * package			:	spo\shared\components\spo-layout\vertical-Tab.js
 * copyright			:	Copyright (c) AnhDT
 * version			:	1.0.0
 * ****************************************************************************
 */

const VerticalTab = (props) => {
    const {
        children, value, index
    } = props;
    const [selectedIndex, setSelected] = useState(index);
    const userProfile = useSelector((state) => state.Auth.data.User);
    const rankConfig = useSelector((state) => state.Common.data.listRankConfig);
    const listPage = [
        {
            index: 0,
            route: PageList.ACCOUNT_INFO.SERVER
        },
        {
            index: 1,
            route: PageList.ORDER_MANAGEMENT.SERVER
        },
        {
            index: 2,
            route: PageList.WISHLIST.SERVER
        },
        {
            index: 3,
            route: PageList.WATCHED.SERVER
        },
        {
            index: 4,
            route: PageList.MY_REVIEWS.SERVER
        },
        {
            index: 5,
            route: PageList.WALLET.SERVER
        },
        // {
        //     index: 6,
        //     route: '/rank'
        // },
        // {
        //     index: 7,
        //     route: ''
        // },
        {
            index: 6,
            route: 'logout'
        },
    ];
    const onGoToTab = (index) => {
        setSelected(index);
        let page = _.find(listPage, { index });
        if (page.route == 'logout') {
            dispatch({
                type: AuthActions.LOGOUT,
                products: [],
            });
            dispatch({
                type: AuthActions.GET_USER_SUCCESS,
                data: {},
            });
            useCustomRoute(dispatch, '/');
        } else if (page.route) {
            useCustomRoute(dispatch, page.route);
        }
    };
    const onChangeFile=(e)=>{
        dispatch({
            type:actions.UPDATE_AVATAR,
            data:{
                data:e,
                user:userProfile
            }
        })
    }
    const dispatch = useDispatch();
    return (
        <>
            <div style={{position: 'sticky', top: 100}}>
                <Tabs className="vertical-tab" onSelect={(firstTab, lastTab) => onGoToTab(firstTab)} selectedIndex={selectedIndex}>
                    <div className="row mx-0">
                        <div className="col-12 px-0">
                            <div className="text-center">
                                <InputUpload avatar={userProfile?.Avatar} onChange={onChangeFile} />
                                <span style={{marginTop: 20, marginBottom: 15, fontSize: 16, color: '#333333', fontWeight: 400}}>
                                    {userProfile.Username || `${userProfile.FirstName} ${userProfile.LastName}`}
                                </span>
                                <ProgressBar value={userProfile?.RankPoint / rankConfig[userProfile?.RankType]?.FromPoint} style={{fontSize: 14, color: '#333333', fontWeight: 400}} />
                                <label className="pt-2" style={{ right: '25%', position: "absolute", fontSize: 14 }}>
                                    {userProfile?.RankPoint}/{rankConfig[userProfile?.RankType]?.FromPoint}
                                </label>
                            </div>
                            <TabList className="tab-content">
                                <Tab>
                                    <p>Thông tin cá nhân</p>
                                </Tab>
                                <Tab>
                                    <p>Quản lý đơn hàng</p>
                                </Tab>
                                <Tab>
                                    <p>Đã thích</p>
                                </Tab>
                                <Tab>
                                    <p>Đã xem</p>
                                </Tab>
                                <Tab>
                                    <p>Đánh giá của tôi</p>
                                </Tab>
                                <Tab>
                                    <p>Ví FM</p>
                                </Tab>
                                {/* <Tab>
                                    <p>Giới thiệu bạn bè, nhận thêm thưởng</p>
                                </Tab>
                                <Tab>
                                    <p>Về chúng tôi</p>
                                </Tab> */}
                                {/* <Tab>
                                    <p>Thứ hạng</p>
                                </Tab>  */}
                                <Tab>
                                    <p>Đăng xuất</p>
                                </Tab>
                            </TabList>
                            <TabPanel/>
                            <TabPanel/>
                            <TabPanel/>
                            <TabPanel/>
                            <TabPanel/>
                            <TabPanel/>
                            <TabPanel/>
                            {/* <TabPanel/> */}
                            {/* 
                            <TabPanel/>
                            <TabPanel/> */}
                        </div>
                    </div>
                </Tabs>
            </div>
        </>
    );
};
VerticalTab.propTypes = {
    children: PropTypes.array,
    index: PropTypes.number,
};
VerticalTab.defaultProps = {
    index: 0,
};
export default VerticalTab;
