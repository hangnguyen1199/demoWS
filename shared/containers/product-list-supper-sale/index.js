const ListItems = dynamic(() => import('@spo/components/item/list-items'), {
    ssr: false,
});
const Header = dynamic(() => import('@spo/components/spo-layout/header'), {
    ssr: false,
});
const CountDownTimeFlip = dynamic(
    () => import('@spo/components/spo-layout/flip-clock'),
    {
        ssr:
            false
    }
);
import constants from '@spo/config/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BreadCrumb from './../../components/common/breadcrumb';
import HeaderBarFilter from '@spo/components/filter/header-bar-filter';
import CustomPagination from '@spo/components/common/custom-pagination';
import EmptyDataComponent from '../../components/common/empty-data';
import Display from '@spo/components/common/display';
import PageList from '../../config/PageList'
import FilterLeftCommon from '../../components/filter/filter-left/filter-left-common';
import RenderDataFilter from '../../components/filter/filter-left/render-data-filter';

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
const ProductListSupperSaleContainer = (props) => {
    const typeDisplay = useSelector((state) => state.App.typeDisplay);
    const router = useRouter();
    const { loading, data, limit, total, offset } = useSelector(
        (state) => state.ProductListType
    );
    const [filterSex, setFilterSex] = useState(null);
    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.GENDER]) {
            setFilterSex(router.query[constants.ROUTER_NAME.GENDER])
        } else {
            setFilterSex(null)
        }
    }, [router.query[constants.ROUTER_NAME.GENDER]])
    function handleChangeSex(sex) {
        let params = { ...router.query };
        params[constants.ROUTER_NAME.GENDER] = sex;
        params[constants.ROUTER_NAME.PAGE] = 1;
        router.replace({
            query: params
        })
        setFilterSex(sex);
    }
    const data_bread_crumb = [
        { name: 'Siêu Sale', path_name: '/' },
    ];
    const data_bread_crumb_desktop = { name: 'Siêu Sale', path_name: PageList.SUPPER_SALE.SERVER };
    const data_bread_crumb_mobi = [{ name: 'Trang chủ', path_name: '/' }, { name: 'Sản phẩm mới', path_name: '/' }];
    return (
        <>
            <div className="product-list-supper-sale">
                {/* <Header /> */}
                <Display mobile={true} >
                    <BreadCrumb data={data_bread_crumb_mobi} />
                </Display>
                <div
                    className="d-flex justify-content-center align-items-end"
                    style={{
                        height: 87,
                        width: 246,
                        margin: 'auto',
                        borderBottom: '2px solid #707070',
                    }}>
                    <div
                        className="d-center d-flex flex-column"
                        style={{ height: 67 }}>
                        <div
                            className="d-center"
                            style={{
                                fontSize: 16,
                                color: '#333333',
                                fontWeight: 500,
                            }}>
                            Kết thúc sau
                        </div>
                        <div className="d-center">
                            {data?.typeProductList[0]?.PromotionTo ?
                                <CountDownTimeFlip
                                    className="clock-flip-responsive margin-bottom-10"
                                    background="#FF2C00"
                                    endTime={
                                        data?.typeProductList[0]?.PromotionTo
                                    }
                                    fontSize={20}
                                /> : null}
                        </div>
                    </div>
                </div>
                <div className="categories-supper-sale d-center">
                    <div>
                        <div
                            className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 2 ? 'active' : ''
                            }`}
                            onClick={() => handleChangeSex(2)}>
                            <div className="">
                                <img
                                    height="67"
                                    src="/images/icon/thoitrangnu.svg"
                                />
                            </div>
                            <div className="categories-supper-sale-item-name">
                                Nữ
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 1 ? 'active' : ''
                            }`}
                            onClick={() => handleChangeSex(1)}>
                            <div className="">
                                <img
                                    height="67"
                                    src="/images/icon/thoitrangnam.svg"
                                />
                            </div>
                            <div className="categories-supper-sale-item-name">
                                Nam
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 3 ? 'active' : ''
                            }`}
                            onClick={() => handleChangeSex(3)}>
                            <div className="">
                                <img
                                    height="67"
                                    src="/images/icon/thoitrangunisex.svg"
                                />
                            </div>
                            <div className="categories-supper-sale-item-name">
                                Unisex
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 4 ? 'active' : ''
                            }`}
                            onClick={() => handleChangeSex(4)}>
                            <div className="">
                                <img
                                    height="67"
                                    src="/images/icon/thoitrangdocap.svg"
                                />
                            </div>
                            <div className="categories-supper-sale-item-name">
                                Đồ cặp
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 5 ? 'active' : ''
                            }`}
                            onClick={() => handleChangeSex(5)}>
                            <div className="">
                                <img
                                    height="67"
                                    src="/images/icon/thoitrangbegai.svg"
                                />
                            </div>
                            <div className="categories-supper-sale-item-name">
                                Bé gái
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 6 ? 'active' : ''
                            }`}
                            onClick={() => handleChangeSex(6)}>
                            <div className="">
                                <img
                                    height="67"
                                    src="/images/icon/thoitrangbetrai.svg"
                                />
                            </div>
                            <div className="categories-supper-sale-item-name">
                                Bé trai
                            </div>
                        </div>
                    </div>
                    {/* <div className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 2 ? 'active' : ''}`}>
                        <div className="">
                        <img height="40" src="/images/icon/thoitrangphukien.svg"/>
                        </div>
                        <div className="categories-supper-sale-item-name" style={{marginTop: 35}}>
                        Phụ kiện
                        </div>
                    </div> */}
                </div>
                <div className="product-list-with-type">
                    <Display mobile>
                        <HeaderBarFilter
                            isShowFilter={true}
                            isShowSortLocation={false}
                            isShowSortSex={false}
                            breadcrum={data_bread_crumb_desktop}
                            typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                        />
                    </Display>
                </div>
                <div className='d-flex flex-row w-100'>
                    <FilterLeftCommon className="pd-lr-common"
                        isShowFilter={true}
                        isShowSortLocation={false}
                        isShowCategoryFilter={true}
                        isShowSortSex={false}
                        typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                        breadcrumbPage={[data_bread_crumb_desktop]}
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
                                                loading={
                                                    loading.loadingTypeProductList
                                                }
                                                isShowMore={true}
                                                isFullWidth={true}
                                                isBorderTop={false}
                                                isShowSaleOrGoldenHour={true}
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

export default ProductListSupperSaleContainer;
