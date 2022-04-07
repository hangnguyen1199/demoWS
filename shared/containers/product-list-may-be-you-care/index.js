const ListItems = dynamic(() => import('@spo/components/item/list-items'), {
    ssr: false,
});
const Header = dynamic(() => import('@spo/components/spo-layout/header'), {
    ssr: false,
});

import constants from '@spo/config/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderBarFilter from '@spo/components/filter/header-bar-filter';
import CustomPagination from '@spo/components/common/custom-pagination';
import BreadCrumb from '../../components/common/breadcrumb';
import CommonActions from '@spo/redux/common/action';
import EmptyDataComponent from '../../components/common/empty-data';
import Display from './../../components/common/display';
import RenderBreadCrumbMobile from '../../components/filter/component-header-bar/render-breadcrum-mobile';
import RenderDataFilter from '../../components/filter/filter-left/render-data-filter';
import FilterLeftCommon from '../../components/filter/filter-left/filter-left-common';

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
const ProductListMatBeYouCareContainer = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const typeDisplay = useSelector((state) => state.App.typeDisplay);
    const { loading, data, limit, total, offset } = useSelector(
        (state) => state.ProductListType
    );
    useEffect(() => {
        dispatch({
            type: CommonActions.LOAD_CATEGORY_MASTER_BY_GENDER,
            data: {
                Type: constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_CARE
            },
        });
        dispatch({
            type: CommonActions.LOAD_SIZE,
        });
    }, [])
    const data_bread_crumb_Desktop = { name: 'Có thể bạn quan tâm', path_name: '/' };

    return (
        <>
            <div className="product-list-with-type">
                {/* <Header /> */}
                <Display mobile={true}>
                    <RenderBreadCrumbMobile
                        breadcrumbPage={[data_bread_crumb_Desktop]}
                        typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                    />
                </Display>
                <Display mobile>
                    <HeaderBarFilter
                        isShowFilter={true}
                        isShowSortLocation={false}
                        breadcrum={data_bread_crumb_Desktop}
                        typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                    />
                </Display>
                <div className='d-flex flex-row w-100'>
                    <FilterLeftCommon className="pd-lr-common"
                        isShowFilter={true}
                        isShowSortLocation={false}
                        isShowCategoryFilter={true}
                        typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                        breadcrumbPage={[data_bread_crumb_Desktop]}
                    />
                    <div className="pd-lr-common product-list-content w-100">
                        <RenderDataFilter
                        />
                        <div className="row px-0 product-content pt-3 mx-0">
                            <div className="col-12 px-0">
                                <div className="product-list-item">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 px-0">
                                        {total.total > 0 || total.total == null ? (<>
                                            <ListItems
                                                isViewInSlider={false}
                                                items={data.typeProductList}
                                                loading={
                                                    loading.loadingTypeProductList
                                                }
                                                isShowMore={true}
                                                isFullWidth={true}
                                                isBorderTop={false}
                                                typeDisplay={typeDisplay}
                                                textColor="#000000"
                                            />
                                        </>
                                        ) : <EmptyDataComponent message="Không có sản phẩm" />
                                        }
                                        {total.total > 0 && (
                                            <CustomPagination
                                                limit={constants.PAGINATION_PRODUCT_LIST.LIMIT}
                                                total={total.total}
                                                pageRangeDisplayed={4}
                                                active={Number(router.query.Page) || 1}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductListMatBeYouCareContainer;


// function handleFilter(e) {
//     let param = {};
//     param['Type'] = constants.TYPE_SEARCH.PRODUCT_TYPE.PRODUCT_CARE;
//     param['Limit'] = constants.PAGINATION_PRODUCT_LIST.LIMIT;
//     param['Offset'] = 0;
//     if (e.orderByPrice) {
//         param['Sort'] = e.orderByPrice;
//     }
//     if (e.filterSex) {
//         param['Gender'] = e.filterSex;
//     }
//     if (e.filterCategory.length > 0) {
//         param['CategoryId'] = e.filterCategory.join(',');
//     }
//     if (e.filterSize.length > 0) {
//         param['SizeId'] = e.filterSize.join(',');
//     }
//     if (e.filterPromotion.length > 0) {
//         param['TypeOfPromotion'] = e.filterPromotion.join(',');
//     }
//     if (e.filterPrice) {
//         param['PriceFrom'] = e.filterPrice.startPrice;
//         param['PriceTo'] = e.filterPrice.endPrice;
//     }
//     setCurrentParamFilter(param);
//     dispatch({
//         type: ProducListNewActions.LOAD_NEWEST_PRODUCT_LIST,
//         data: { data: param },
//     });
// }