import React, { useEffect, useState } from 'react';
import Display from './../../common/display';
import GenderFilter from './components/gender-filter';
import CategoryFilter from './components/category-filter';
import SizeFilter from './components/size-filter';
import PriceFilter from './components/price-filter';
import PromotionFilter from './components/promotion-filter';
import ButtonMain from './../../common/button-main';
import { useRouter } from 'next/router';
import constants from '@spo/config/constants';
import { useDispatch, useSelector } from 'react-redux';
import CommonActions from '@spo/redux/common/action';
import RenderBreadCrumb from './../component-header-bar/render-breadCrumb';
import EventRegister, {
    DELETE_DATA_FILTER,
} from '../../../utils/EventRegister';
import PropTypes from 'prop-types';
import $ from 'jquery'

function FilterLeftCommon(props) {
    const [categoryListFake, setCategoryListFake] = useState([]);
    const [dataFilterPromotionFake, setDataFilterPromotionFake] = useState([]);
    const [dataFilterSizeFake, setDataFilterSizeFake] = useState([]);
    const [priceFake, setPriceFake] = useState({});
    const common = useSelector((state) => state.Common);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        let params = {};
        if (router.query[constants.ROUTER_NAME.GENDER]) {
            params['Gender'] = router.query[constants.ROUTER_NAME.GENDER];
        }
        if (router.query[constants.ROUTER_NAME.CATEGORY]) {
            params['CategoryId'] = router.query[constants.ROUTER_NAME.CATEGORY];
        }
        dispatch({
            type: CommonActions.LOAD_SIZE,
            data: params,
        });
    }, [
        router.query[constants.ROUTER_NAME.CATEGORY],
        router.query[constants.ROUTER_NAME.GENDER],
    ]);
    useEffect(() => {
        if (
            router.query[constants.ROUTER_NAME.PRICE_FROM] ||
            router.query[constants.ROUTER_NAME.PRICE_TO]
        ) {
            setPriceFake({
                startPrice: router.query[constants.ROUTER_NAME.PRICE_FROM],
                endPrice: router.query[constants.ROUTER_NAME.PRICE_TO],
            });
        } else {
            setPriceFake({});
        }
    }, [
        router.query[constants.ROUTER_NAME.PRICE_FROM],
        router.query[constants.ROUTER_NAME.PRICE_TO],
    ]);

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.PROMOTION]) {
            setDataFilterPromotionFake(
                router.query[constants.ROUTER_NAME.PROMOTION].split(',')
            );
        } else {
            setDataFilterPromotionFake([]);
        }
    }, [router.query[constants.ROUTER_NAME.PROMOTION]]);

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.SIZE]) {
            let arraySize = router.query[constants.ROUTER_NAME.SIZE].split(',');
            setDataFilterSizeFake(arraySize);
        } else {
            setDataFilterSizeFake([]);
        }
    }, [router.query[constants.ROUTER_NAME.SIZE]]);
    const handleSubmit = () => {
        let arrayCategoryFake = [...categoryListFake];
        let routerParams = { ...router.query };
        routerParams[constants.ROUTER_NAME.PAGE] = 1;
        delete routerParams[constants.ROUTER_NAME.SIZE];
        delete routerParams[constants.ROUTER_NAME.PRICE_FROM];
        delete routerParams[constants.ROUTER_NAME.PRICE_TO];
        delete routerParams[constants.ROUTER_NAME.PROMOTION];
        // delete routerParams[constants.ROUTER_NAME.SORT_BY_PRICE];
        if (arrayCategoryFake.length > 0) {
            routerParams[constants.ROUTER_NAME.CATEGORY] =
                arrayCategoryFake.join(',');
        } else if (
            props.typeCategory != constants.TYPE_CATEGORY.CATEGORY_PRODUCT_LIST
        ) {
            let categoryRouter = routerParams[constants.ROUTER_NAME.CATEGORY];

            let cate = common.data.listCategoryMasterAll.find(
                (v) => v.Id == categoryRouter?.split(',')[0]
            );
            // routerParams[constants.ROUTER_NAME.CATEGORY] = cate?.ParentId;
            // xoá và ko quay về category cha
            delete routerParams[constants.ROUTER_NAME.CATEGORY];
        } else {
            delete routerParams[constants.ROUTER_NAME.CATEGORY];
        }
        if (routerParams[constants.ROUTER_NAME.CATEGORY]) {
            routerParams[constants.ROUTER_NAME.CATEGORY];
        } else {
            delete routerParams[constants.ROUTER_NAME.CATEGORY];
        }

        //price
        if (priceFake.startPrice || priceFake.endPrice) {
            routerParams[constants.ROUTER_NAME.PRICE_FROM] =
                priceFake.startPrice;
            routerParams[constants.ROUTER_NAME.PRICE_TO] = priceFake.endPrice;
        } else {
            delete routerParams[constants.ROUTER_NAME.PRICE_FROM];
            delete routerParams[constants.ROUTER_NAME.PRICE_TO];
        }
        if (dataFilterPromotionFake.length > 0) {
            routerParams[constants.ROUTER_NAME.PROMOTION] =
                dataFilterPromotionFake.join(',');
        } else {
            delete routerParams[constants.ROUTER_NAME.PROMOTION];
        }

        //size
        if (dataFilterSizeFake.length > 0) {
            routerParams[constants.ROUTER_NAME.SIZE] =
                dataFilterSizeFake.join(',');
        } else {
            delete routerParams[constants.ROUTER_NAME.SIZE];
        }

        router.push({
            query: {
                ...routerParams,
            },
        });

        dispatch({
            type: CommonActions.LOAD_SIZE,
            data: routerParams[constants.ROUTER_NAME.CATEGORY],
        });
    };

    const onChange = (data) => {
        setCategoryListFake(data);
    };

    const onChangePrice = (item) => {
        let dataFilter = { ...priceFake };
        dataFilter = item;
        setPriceFake(dataFilter);
    };

    const handlePromotion = (e) => {
        let dataPromotion = [...dataFilterPromotionFake];

        if (dataPromotion.length > 0) {
            let index = dataPromotion.findIndex((v) => v == e);
            if (index > -1) {
                dataPromotion.splice(index, 1);
            } else {
                dataPromotion.push(e);
            }
        } else {
            dataPromotion.push(e);
        }
        setDataFilterPromotionFake(dataPromotion);
    };
    const handleSizeId = (e) => {
        let dataSize = [...dataFilterSizeFake];
        if (dataSize.length > 0) {
            let index = dataSize.findIndex((v) => v == e);
            if (index > -1) {
                dataSize.splice(index, 1);
            } else {
                dataSize.push(e);
            }
        } else {
            dataSize.push(e);
        }
        setDataFilterSizeFake(dataSize);
    };

    const handleRemove = () => {
        // xoá bản nháp
        let params = { ...router.query };
        delete params[constants.ROUTER_NAME.GENDER];
        delete params[constants.ROUTER_NAME.CATEGORY];
        delete params[constants.ROUTER_NAME.SIZE];
        delete params[constants.ROUTER_NAME.PROMOTION];
        delete params[constants.ROUTER_NAME.PRICE_FROM];
        delete params[constants.ROUTER_NAME.PRICE_TO];
        delete params[constants.ROUTER_NAME.SORT_BY_PRICE];
        // params[constants.ROUTER_NAME.HOT_CATEGORY]=constants.TYPE_CATEGORY_HOME['Type']

        params[constants.ROUTER_NAME.PAGE] = 1;

        router.replace({
            query: params,
        });

        EventRegister.emit(DELETE_DATA_FILTER);

        setDataFilterSizeFake([]);
        setPriceFake({});
        setDataFilterPromotionFake([]);
    };
    let height = 0;
    let heightFilter = 0 ;
    if(typeof window != 'undefined'){
        height = $('.breadCrumb-filter-left')?.height();
        heightFilter = window.innerHeight - 30 - $('.sticky-top')?.height() - ($('.breadCrumb-filter-left')?.height() ? $('.breadCrumb-filter-left')?.height() + 20 : 0);
        if($('.search_info_section')?.height()){
            heightFilter = heightFilter - $('.search_info_section')?.height();
        }
    }
    return (
        <>
            <Display>
                <div className='mt-3'>
                    <RenderBreadCrumb {...props} />
                    <div className={`container-filter-left ${props.className}`} style={{top: height ?? 0 ,  maxHeight: heightFilter }} >
                        {/* <div className="breadCum-filter-left title-breadcum">
                            <RenderBreadCrumb {...props} />
                        </div> */}
                        <div className="w-100">
                            {/* <div className="d-flex justify-content-between align-items-center">
                                <ButtonMain
                                    title="Xoá tất cả"
                                    className="mr-1 btn-light-remove"
                                    onClick={handleRemove}
                                />
                                <ButtonMain
                                    onClick={handleSubmit}
                                    title="Áp dụng"
                                    className="ml-1"
                                />
                            </div> */}
                            {props.isShowSortSex && (
                                <GenderFilter className="" />
                            )}
                            <CategoryFilter
                                {...props}
                                className="mt-3"
                                onChange={onChange}
                            />
                            <SizeFilter
                                sizeData={dataFilterSizeFake}
                                handleSizeId={handleSizeId}
                                className="mt-3"
                            />
                            <PriceFilter
                                priceData={priceFake}
                                onChange={onChangePrice}
                                className="mt-3"
                            />
                            <PromotionFilter
                                dataPromotion={dataFilterPromotionFake}
                                handlePromotion={handlePromotion}
                                className="mt-3"
                            />
                            <div className="d-flex justify-content-between align-items-center _wrap_button_filter">
                                <ButtonMain
                                    title="Xoá tất cả"
                                    className="mr-1 btn-light-remove"
                                    onClick={handleRemove}
                                />
                                <ButtonMain
                                    onClick={handleSubmit}
                                    title="Áp dụng"
                                    className="ml-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Display>
        </>
    );
}

FilterLeftCommon.propTypes = {
    isShowSortSex: PropTypes.bool,
};

FilterLeftCommon.defaultProps = {
    isShowSortSex: true,
};
export default FilterLeftCommon;
