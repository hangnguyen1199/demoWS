import constants from '@spo/config/constants';
import HomeActions from '@spo/redux/home/action';
import ProducListWatchedActions from '@spo/redux/product-list-watched/action';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomPagination from '@spo/components/common/custom-pagination';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import BreadCrumb from './../../components/common/breadcrumb';
import VerticalTab from '@spo/components/spo-layout/vertical-tab';
import Display from '../../components/common/display';
import { scrollTop } from './../../library/helper';
import ButtonMain from '../../components/common/button-main';

const ListItems = dynamic(() => import('@spo/components/item/list-items'), {
    ssr: false,
});
const Header = dynamic(() => import('@spo/components/spo-layout/header'), {
    ssr: false,

});
/**
 * ****************************************************************************
 * HAIDT Index CODE
 * index.js
 *
 * description		:
 * created at		:	2020-11-16
 * created by		:	HAIDT
 * package			:	spo\shared\containers\item-detail\index.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const ProductListWatchedContainer = (props) => {
    const dispatch = useDispatch();
    const typeDisplay = useSelector((state) => state.App.typeDisplay);
    const { loading, data, limit, total, offset } = useSelector(
        (state) => state.ProductListWatched
    );
    const router = useRouter();
    const gotoHome = () => {
        useCustomRoute(dispatch, '/');
    };
    const data_bread_crumb = [
        { name: 'Trang chủ', path_name: '/' },
        { name: 'Tài khoản', path_name: '/' },
    ]; //TODO
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);

    return (
        <>
            <div >
                {/* <Header /> */}
                <BreadCrumb data={breadcrum} />
                <div className="bg-white account-info">
                    <div className="px-0">
                        <div className="page-body">
                            <Display>
                                <div className="col-12 col-lg-3 px-0">
                                    <VerticalTab index={3}></VerticalTab>
                                </div>
                            </Display>
                            {data.watchedProductList.length > 0 ? (
                                <div className="col-lg-9 col-12 px-0 container-left-table" style={{ width: '100%' }}>
                                    <div className="watched-content">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 px-0">
                                            <ListItems
                                                isViewInSlider={false}
                                                items={data.watchedProductList}
                                                loading={
                                                    loading.loadingWatchedProductList
                                                }
                                                isShowMore={true}
                                                isFullWidth={true}
                                                isBorderTop={false}
                                                typeDisplay={typeDisplay}
                                                textColor="#000000"
                                            />
                                            {total.total > 0 && (
                                                <CustomPagination
                                                    limit={constants.PAGINATION.LIMIT}
                                                    total={total.total}
                                                    pageRangeDisplayed={4}
                                                    active={router.query.Page || 1}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="col-lg-9 col-12 zero-record">
                                    <div
                                        className="d-center"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: 24,
                                            color: '#000000',
                                            paddingBottom: 20,
                                        }}>
                                        Danh sách đã xem
                                    </div>
                                    <div
                                        className="d-center"
                                        style={{
                                            fontWeight: 400,
                                            fontSize: 16,
                                            color: '#333333',
                                            paddingBottom: 30,
                                        }}>
                                        Danh sách đã xem gần đây của bạn chưa có gì
                                    </div>
                                    <Display>
                                        <div
                                            style={{
                                                flex: 1,
                                                height: 39,
                                                width: 400,
                                                margin: 'auto',
                                            }}>
                                            <ButtonMain
                                                className="w-100"
                                                onClick={gotoHome}
                                                title={'Tiếp tục mua sắm'}
                                            />
                                        </div>
                                    </Display>
                                    <Display mobile={true}>
                                        <div
                                            style={{
                                                flex: 1,
                                                height: 39,
                                                margin: 'auto',
                                            }}>
                                            <ButtonMain
                                                className="w-100"
                                                onClick={gotoHome}
                                                title={'Tiếp tục mua sắm'}
                                            />
                                        </div>
                                    </Display>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 px-0 _care_product bottom">
                    <ListItems
                        sectionTitle={'CÓ THỂ BẠN QUAN TÂM'}
                        isViewInSlider={true}
                        items={data.relativeProducts}
                        isFullWidth={true}
                        loading={false}
                        isShowMore={true}
                        textColor="#000000"
                        backgroundHeader="#ffffff"
                    />
                </div>
            </div>
        </>
    );
};

export default ProductListWatchedContainer;
