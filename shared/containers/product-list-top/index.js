const ListItems = dynamic(() => import('@spo/components/item/list-items'), {
    ssr: false,
});
const Header = dynamic(() => import('@spo/components/spo-layout/header'), {
    ssr: false,
});
import constants from '@spo/config/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import HeaderBarFilter from '@spo/components/filter/header-bar-filter';
import CustomPagination from '@spo/components/common/custom-pagination';
import BreadCrumb from './../../components/common/breadcrumb';
import EmptyDataComponent from '../../components/common/empty-data';
import Display from '@spo/components/common/display';
import PageList from '../../config/PageList';
import RenderBreadCrumbMobile from '../../components/filter/component-header-bar/render-breadcrum-mobile';
import FilterLeftCommon from '../../components/filter/filter-left/filter-left-common';
import RenderDataFilter from './../../components/filter/filter-left/render-data-filter';
/**
 * ****************************************************************************
 * HAIDT Index CODE
 * index.js
 *
 * description		:
 * created at		:	2020-11-16
 * created by		:	HAIDT
 * package			:	spo\shared\containers\product-list-golden-hour\index.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const ProductListTopContainer = (props) => {
    const router = useRouter();
    const typeDisplay = useSelector((state) => state.App.typeDisplay);
    const { loading, data, limit, total, offset } = useSelector(
        (state) => state.ProductListType,
    );
    const data_bread_crumb = { name: 'Tìm kiếm hàng đầu', path_name: PageList.PRODUCT_LIST_TOP.SERVER }
    return (
        <>
            <div className="product-list-with-type">
                <Display mobile={true} >
                    <RenderBreadCrumbMobile
                        breadcrumbPage={[data_bread_crumb]}
                        typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                    />
                </Display>
                <Display mobile>
                    <HeaderBarFilter
                        isShowFilter={true}
                        isShowSortLocation={false}
                        breadcrum={data_bread_crumb}
                        isShowCategoryFilter={true}
                        typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                    />
                </Display>
                <div className='d-flex flex-row w-100'>
                    <FilterLeftCommon className="pd-lr-common"
                        isShowFilter={true}
                        isShowSortLocation={false}
                        breadcrum={data_bread_crumb}
                        isShowCategoryFilter={true}
                        typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                        breadcrumbPage={[data_bread_crumb]}
                    />
                    <div className="pd-lr-common product-list-content w-100">
                        <RenderDataFilter
                        />
                        <div className="row px-0 product-content mx-0">
                            <div className="col-12 px-0">
                                <div className="product-list-item">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 px-0">

                                        {total.total > 0 || total.total == null ? (<>
                                            <ListItems
                                                isViewInSlider={false}
                                                items={data.typeProductList}
                                                loading={loading.loadingTypeProductList}
                                                isShowMore={true}
                                                isFullWidth={true}
                                                isBorderTop={false}
                                                typeDisplay={typeDisplay}
                                                textColor="#000000"
                                            />
                                        </>
                                        ) : <EmptyDataComponent message="Không có sản phẩm" />
                                        }
                                        {!loading?.loadingTypeProductList && total.total > 0 && (
                                            <CustomPagination
                                                limit={constants.PAGINATION_PRODUCT_LIST.LIMIT}
                                                total={total.total}
                                                pageRangeDisplayed={4}
                                                active={router.query.Page || 1}
                                                onChange={() => { }}
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

export default ProductListTopContainer;
