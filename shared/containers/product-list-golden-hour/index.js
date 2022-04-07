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
    },
);
import constants from '@spo/config/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BreadCrumb from './../../components/common/breadcrumb';
import HeaderBarFilter from '@spo/components/filter/header-bar-filter';
import CustomPagination from '@spo/components/common/custom-pagination';
import moment from 'moment';
import CommonActions from '@spo/redux/common/action';
import { scrollTop } from '../../library/helper';
import EmptyDataComponent from '../../components/common/empty-data';
import Display from '@spo/components/common/display';
import PageList from './../../config/PageList';
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
 * package			:	spo\shared\containers\product-list-golden-hour\index.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const ProductListGoldenHourContainer = (props) => {
    const dispatch = useDispatch();
    const typeDisplay = useSelector((state) => state.App.typeDisplay);
    const { loading, data, limit, total, offset } = useSelector((state) => state.ProductListType);
    const [filterSex, setFilterSex] = useState(null);
    const [isActiveTime, setIsActiveTime] = useState(0);
    const router = useRouter()

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.GENDER]) {
            setFilterSex(router.query[constants.ROUTER_NAME.GENDER])
        } else {
            setFilterSex(null)
        }
    }, [router.query[constants.ROUTER_NAME.GENDER]])

    function handleChangeTime(index) {
        setIsActiveTime(index);
    }
    function handleChangeSex(sex) {

        const paramsRouter = { ...router.query }
        paramsRouter[constants.ROUTER_NAME.GENDER] = sex;
        paramsRouter[constants.ROUTER_NAME.QUERY_TIME] = data.supperSalePromotionTimeList[isActiveTime]?.Time;
        paramsRouter[constants.ROUTER_NAME.PAGE] = 1;
        router.replace({
            query: paramsRouter
        },
        undefined,
        { shallow: true });
        scrollTop();
    }

    function checkTime(item) {
        let timePromoStart = moment(item.From);
        let timePromoEnd = moment(item.To);
        return moment().isAfter(timePromoStart) && moment().isBefore(timePromoEnd);
    }
    const data_bread_crumb_desktop = { name: 'Giờ vàng', path_name: PageList.HOUR_GOLD.SERVER };


    return (
        <>
            <div className="product-list-supper-sale">
                <Display mobile={true} >
                    <RenderBreadCrumbMobile
                        breadcrumbPage={[data_bread_crumb_desktop]}
                        typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                    />
                </Display>
                <div className="d-flex justify-content-center align-items-end golden-time">
                    <div className="group-golden d-flex">
                        {data.supperSalePromotionTimeList?.map((item, index) => {
                            return (
                                <div key={index} className='pr-2'>
                                    <div className={`d-center pointer d-flex flex-column countdown ${isActiveTime == index ? 'active' : ''}`}
                                        onClick={() => handleChangeTime(index)}>
                                        <div className="d-center" style={{ fontSize: 16, color: "#333333", fontWeight: 500 }}>{item.Time}</div>
                                        <div className="d-center">
                                            {checkTime(item)
                                                ? (<CountDownTimeFlip className="margin-bottom-10 clock-flip-responsive" background={`${index == 0 ? '#FF2C00' : 'black'}`} endTime={item.To} fontSize={20} />) :
                                                <div style={{ fontSize: 16, fontWeight: 400, color: "#333333" }}>Sắp diễn ra</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="categories-supper-sale d-center">
                    <div>
                        <div className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 2 ? 'active' : ''}`} onClick={() => handleChangeSex(2)}>
                            <div className="">
                                <img height="67" src="/images/icon/thoitrangnu.svg" />
                            </div>
                            <div className="categories-supper-sale-item-name">
                Nữ
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 1 ? 'active' : ''}`} onClick={() => handleChangeSex(1)}>
                            <div className="">
                                <img height="67" src="/images/icon/thoitrangnam.svg" />
                            </div>
                            <div className="categories-supper-sale-item-name">
                Nam
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 3 ? 'active' : ''}`} onClick={() => handleChangeSex(3)}>
                            <div className="">
                                <img height="67" src="/images/icon/thoitrangunisex.svg" />
                            </div>
                            <div className="categories-supper-sale-item-name">
                Unisex
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 4 ? 'active' : ''}`} onClick={() => handleChangeSex(4)}>
                            <div className="">
                                <img height="67" src="/images/icon/thoitrangdocap.svg" />
                            </div>
                            <div className="categories-supper-sale-item-name">
                Đồ cặp
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 5 ? 'active' : ''}`} onClick={() => handleChangeSex(5)}>
                            <div className="">
                                <img height="67" src="/images/icon/thoitrangbegai.svg" />
                            </div>
                            <div className="categories-supper-sale-item-name">
                Bé gái
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={`d-flex flex-column justify-content-center align-items-center categories-supper-sale-item ${filterSex == 6 ? 'active' : ''}`} onClick={() => handleChangeSex(6)}>
                            <div className="">
                                <img height="67" src="/images/icon/thoitrangbetrai.svg" />
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
                <div className="mt-4 product-list-with-type">
                    <Display mobile>
                        <HeaderBarFilter
                            isShowFilter={true}
                            isShowSortLocation={false}
                            isShowSortSex={false}
                            isShowSortPromotion={false}
                            typeCategory={constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST}
                            breadcrum={data_bread_crumb_desktop}
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
                        <div className="row px-0 product-content pt-3 mx-0">
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
                                                isShowSaleOrGoldenHour={true}
                                                typeDisplay={typeDisplay}
                                                textColor="#000000"
                                            />
                                        </>
                                        ) : <EmptyDataComponent message="Không có sản phẩm" />
                                        }
                                        {total.total > 0 && (
                                            <CustomPagination
                                                limit={limit.limit}
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

export default ProductListGoldenHourContainer;
