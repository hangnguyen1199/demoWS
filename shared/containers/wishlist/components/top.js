import WishlistActions from '@spo/redux/wishlist/action';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppActions from '@spo/redux/app/action';
import ListItems from '@spo/components/item/list-items';
import CustomPagination from '@spo/components/common/custom-pagination';
import constants from '@spo/config/constants';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import VerticalTab from '../../../components/spo-layout/vertical-tab';
import Display from '../../../components/common/display';
import { useRouter } from 'next/router';
import { scrollTop } from './../../../library/helper';
import ButtonMain from '../../../components/common/button-main';
import WishListLoader from './list-loader';
/**
 * ****************************************************************************
 * HaiDT Top CODE
 * top.js
 *
 * description		:
 * created at		:	2021-11-27
 * created by		:	HaiDT
 * package			:	spo\shared\containers\wishlist\components\top.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
function Top(props) {
    const router = useRouter()
    const dispatch = useDispatch();
    const { loading, data, limit, total, offset } = useSelector(
        (state) => state.Wishlist
    );
    const typeDisplay = useSelector((state) => state.App.typeDisplay);
    useEffect(() => {
        // dispatch({
        //     type: AppActions.TOGGLE_CHANGE_TYPE_DISPLAY,
        //     data: 3,
        // });
    }, []);
    const gotoHome = () => {
        useCustomRoute(dispatch, '/');
    };

    return (
        <div>
            <div className="bg-white account-info">
                <div className="px-0">
                    <div className="page-body">
                        <Display>
                            <div className="col-12 col-lg-3 px-0">
                                <VerticalTab index={2}></VerticalTab>
                            </div>
                        </Display>
                        <div className="col-12 col-lg-9 px-0 container-left-table">
                            {loading.loadingWishlist ? (
                                <WishListLoader />
                            ) : (
                                <>
                                    {total.total == 0 && (
                                        <div className="d-flex flex-column justify-content-center">
                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                                <span className="text-center fontsize24 bold">
                                                    Danh sách yêu thích
                                                </span>
                                                <div
                                                    className="fontsize16"
                                                    style={{
                                                        paddingTop: 20,
                                                        paddingBottom: 15,
                                                    }}
                                                >
                                                    Danh sách yêu thích của bạn
                                                    chưa có gì
                                                </div>
                                                <div
                                                    className="buttonSet text-center"
                                                    style={{
                                                        paddingTop: 15,
                                                        paddingBottom: 10,
                                                        width: 400,
                                                    }}
                                                >
                                                    <div style={{ height: 39 }}>
                                                        <ButtonMain
                                                            className="w-100"
                                                            onClick={gotoHome}
                                                            fontSize={16}
                                                            title={
                                                                'TIẾP TỤC MUA SẮM'
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {total.total > 0 && (
                                        <ListItems
                                            sectionTitle={''}
                                            isViewInSlider={false}
                                            items={data.wishlist}
                                            loading={loading.loadingWishlist}
                                            isBorderTop={false}
                                            isFullWidth={true}
                                            typeDisplay={typeDisplay}
                                            textColor="#000000"
                                            type=""
                                        />
                                    )}
                                </>
                            )}
                            {total.total > 0 && (
                                <CustomPagination
                                    limit={limit.limit}
                                    total={total.total}
                                    pageRangeDisplayed={4}
                                    active={(router.query.Page) || 1}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Top.defaultProps = {};
export default Top;
