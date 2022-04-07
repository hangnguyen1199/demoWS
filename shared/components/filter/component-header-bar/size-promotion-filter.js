/* eslint-disable import/newline-after-import */
import React, { useState, useEffect } from 'react'
import IconFilter from './../../common/icon-filter';
import constants from '@spo/config/constants';
import IconChevronDown from '@spo/components/common/icon-chevron-down';
import SortPriceFilter from './sort-price-filter';
import PromotionFilter from './promotion-filter';
import ButtonLight from '@spo/components/common/button-light';
import ButtonRed from '@spo/components/common/button-red';
import { useSelector } from 'react-redux';
import SizeFilter from './size-filter';
import PriceFilters from './price-filter';
import { useRouter } from 'next/router';
export default function SizePromotionFilter(props) {
    const {
        handleOpenModalOverlay,
        openModalOverlay = false,
        isShowSortSize,
        isShowSortByPrice,
        isShowSortPromotion,
        totalFilter=0
    } = props;
    const router = useRouter();
    // const [dataFilterSize, setDataFilterSize] = useState([]);
    // const [dataFilterPrice, setDataFilterPrice] = useState({});
    // const [dataFilterPriceSort, setDataFilterPriceSort] = useState({});
    // const [dataFilterPromotion, setDataFilterPromotion] = useState([]);

    const [dataFilterSizeFake, setDataFilterSizeFake] = useState([]);
    const [dataFilterPriceFake, setDataFilterPriceFake] = useState({});
    const [dataFilterPriceSortFake, setDataFilterPriceSortFake] = useState('');
    const [dataFilterPromotionFake, setDataFilterPromotionFake] = useState([]);
    const common = useSelector((state) => state.Common);
    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.SIZE]) {
            let arraySize = router.query[constants.ROUTER_NAME.SIZE].split(',');
            setDataFilterSizeFake(arraySize)
        } else {
            setDataFilterSizeFake([])
        }
    }, [router.query[constants.ROUTER_NAME.SIZE]])

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.SORT_BY_PRICE]) {
            setDataFilterPriceSortFake(router.query[constants.ROUTER_NAME.SORT_BY_PRICE])
        } else {
            setDataFilterPriceSortFake('')
        }
    }, [router.query[constants.ROUTER_NAME.SORT_BY_PRICE]])

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.PRICE_FROM] || router.query[constants.ROUTER_NAME.PRICE_TO]) {
            setDataFilterPriceFake({
                startPrice: router.query[constants.ROUTER_NAME.PRICE_FROM],
                endPrice: router.query[constants.ROUTER_NAME.PRICE_TO]
            })
        } else {
            setDataFilterPriceFake({})
        }
    }, [router.query[constants.ROUTER_NAME.PRICE_FROM], router.query[constants.ROUTER_NAME.PRICE_TO]])

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.PROMOTION]) {
            setDataFilterPromotionFake(router.query[constants.ROUTER_NAME.PROMOTION].split(','))
        } else {
            setDataFilterPromotionFake([]);
        }
    }, [router.query[constants.ROUTER_NAME.PROMOTION]])

    const handleSizeId = (e) => {
        let dataSize = [...dataFilterSizeFake];
        if (dataSize.length > 0) {
            let index = dataSize.findIndex(v => v == e);
            if (index > -1) {
                dataSize.splice(index, 1);
            } else {
                dataSize.push(e)
            }
        } else {
            dataSize.push(e);
        }
        setDataFilterSizeFake(dataSize)
    }
    const handleSubmit = () => {
        let paramRouter = { ...router.query };

        //size
        if (dataFilterSizeFake.length > 0) {
            paramRouter[constants.ROUTER_NAME.SIZE] = dataFilterSizeFake.join(',');

        } else {
            delete paramRouter[constants.ROUTER_NAME.SIZE]
        }
        // price
        if (dataFilterPriceFake.startPrice || dataFilterPriceFake.endPrice) {
            paramRouter[constants.ROUTER_NAME.PRICE_FROM] = dataFilterPriceFake.startPrice;
            paramRouter[constants.ROUTER_NAME.PRICE_TO] = dataFilterPriceFake.endPrice;
        } else {
            delete paramRouter[constants.ROUTER_NAME.PRICE_FROM];
            delete paramRouter[constants.ROUTER_NAME.PRICE_TO];
        }
        //sort

        if (dataFilterPriceSortFake) {
            paramRouter[constants.ROUTER_NAME.SORT_BY_PRICE] = dataFilterPriceSortFake;
        } else {
            delete paramRouter[constants.ROUTER_NAME.SORT_BY_PRICE];
        }

        //promotion

        if (dataFilterPromotionFake.length > 0) {
            paramRouter[constants.ROUTER_NAME.PROMOTION] = dataFilterPromotionFake.join(',');
        } else {
            delete paramRouter[constants.ROUTER_NAME.PROMOTION]
        }
        paramRouter[constants.ROUTER_NAME.PAGE] = 1;
        router.replace({
            query: paramRouter
        })
    }
    //price
    const handlePrice = (e) => {
        let dataFilter = { ...dataFilterPriceFake };
        dataFilter = e;
        setDataFilterPriceFake(dataFilter)
    }

    //price sort
    const handleSortPrice = (e) => {
        let data = { ...dataFilterPriceSortFake };
        if (e === dataFilterPriceSortFake) {
            data = ''
        } else {
            data = e;
        }

        setDataFilterPriceSortFake(data);
    }

    //handlePromotion
    const handlePromotion = (e) => {
        let dataPromotion = [...dataFilterPromotionFake];

        if (dataPromotion.length > 0) {
            let index = dataPromotion.findIndex(v => v == e);
            if (index > -1) {
                dataPromotion.splice(index, 1);
            } else {
                dataPromotion.push(e);
            }
        } else {
            dataPromotion.push(e);
        }
        setDataFilterPromotionFake(dataPromotion)
    }

    const handleRemoveSize = () => {
        let params = { ...router.query };
        delete params[constants.ROUTER_NAME.SIZE]
        delete params[constants.ROUTER_NAME.PROMOTION]
        delete params[constants.ROUTER_NAME.PRICE_FROM]
        delete params[constants.ROUTER_NAME.PRICE_TO]
        delete params[constants.ROUTER_NAME.PRICE_TO]
        delete params[constants.ROUTER_NAME.SORT_BY_PRICE]
        params[constants.ROUTER_NAME.CATEGORY_HOT]=constants.TYPE_CATEGORY_HOME['Type']
        router.replace({
            query: params

        })
    }
    return (
        <>
            <div className='d-flex flex-row mr-0 pointer align-items-center category-filter-option'>
                <span onClick={() => handleOpenModalOverlay(constants.TYPE_SUBMIT_FILTER.HANDLE_SUBMIT_SIZE)}
                    className='icon-filter-category'>
                    <IconFilter className="d-flex  align-items-center" />
                </span>
                <p onClick={() => handleOpenModalOverlay(constants.TYPE_SUBMIT_FILTER.HANDLE_SUBMIT_SIZE)}
                    className='mx-2 m-0 name-category-left'>Bộ Lọc ({totalFilter})</p>
                <span
                    onClick={() =>
                        handleOpenModalOverlay(constants.TYPE_SUBMIT_FILTER.HANDLE_SUBMIT_CATEGORY)}
                    className='m-0 icon-filter-row'><IconChevronDown /></span>
                <div className={`menu-item-sub cursor-pointer-default panel-hover-menu ${openModalOverlay == constants.TYPE_SUBMIT_FILTER.HANDLE_SUBMIT_SIZE ? 'show-modal' : ''}`}>
                    <div className='menu-item-sub-wap border-top mt-4'>
                        <div className='w-100 d-flex flex-column pt-4'>
                            <div className='menu-modal-row'>
                                {isShowSortSize && (
                                    <SizeFilter common={common} handleSizeId={handleSizeId} dataFilter={dataFilterSizeFake} />
                                )}
                                <PriceFilters dataFilter={dataFilterPriceFake} onChangePrice={handlePrice} />
                                {isShowSortByPrice && (
                                    <SortPriceFilter dataFilter={dataFilterPriceSortFake} handleSortPrice={handleSortPrice} />
                                )}
                                {isShowSortPromotion && (
                                    <PromotionFilter dataFilter={dataFilterPromotionFake} handlePromotion={handlePromotion} />
                                )}
                            </div>
                            <div className='menu-modal-button'>
                                <ButtonLight onClick={() => {
                                    handleRemoveSize()
                                    handleOpenModalOverlay(null)
                                }} className="btn-remove-option" title="Xoá tất cả" />
                                <ButtonRed onClick={() => {
                                    handleSubmit()
                                    handleOpenModalOverlay(null)
                                }} className="btn-add-option" title="Áp dụng" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
