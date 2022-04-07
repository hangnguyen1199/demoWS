import React, { useEffect, useState } from 'react'
import FooterFilterMobile from './footer-filter-mobile';
import constants from '@spo/config/constants';
import { useRouter } from 'next/router';

export default function SortFilterMobile(props) {
    const {
        showFilterMobileType,
        handleShowFilterMobileType,
        handleShowModalFilter
    } = props;
    const router = useRouter();
    const [dataFilterPriceSortFake, setDataFilterPriceSortFake] = useState('');
    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.SORT_BY_PRICE]) {
            setDataFilterPriceSortFake(router.query[constants.ROUTER_NAME.SORT_BY_PRICE])
        } else {
            setDataFilterPriceSortFake('')
        }
    }, [router.query[constants.ROUTER_NAME.SORT_BY_PRICE]])
    const handleRemoveSize = () => {
        let params = { ...router.query };
        delete params[constants.ROUTER_NAME.SORT_BY_PRICE]

        router.replace({
            query: params

        })
        handleShowModalFilter(false)
        handleShowFilterMobileType(null)
    }
    const handleSortPrice = (e) => {
        let data = { ...dataFilterPriceSortFake };
        if (e === dataFilterPriceSortFake) {
            data = ''
        } else {
            data = e;
        }

        setDataFilterPriceSortFake(data);
    }
    const handleSubmit = () => {
        let paramRouter = { ...router.query };
        if (dataFilterPriceSortFake) {
            paramRouter[constants.ROUTER_NAME.SORT_BY_PRICE] = dataFilterPriceSortFake;
        } else {
            delete paramRouter[constants.ROUTER_NAME.SORT_BY_PRICE];
        }
        paramRouter[constants.ROUTER_NAME.PAGE] = 1;
        router.replace({
            query: paramRouter
        })
        handleShowModalFilter(false)
        handleShowFilterMobileType(null)
    }
    return (
        <>
            <div className="pointer">
                <div className="filter-sort filter-sort-by-price ">
                    <div className="menu-name d-flex" onClick={() => handleShowFilterMobileType(constants.TYPE_SHOW_FILTER_MOBILE.SHOW_SORT)}>
                        <span className='d-start'>
                            {router.query[constants.ROUTER_NAME.SORT_BY_PRICE] &&
                router.query[constants.ROUTER_NAME.SORT_BY_PRICE] && (<div className='filter-dot'></div>)}
              Sắp xếp theo
                        </span>
                        <div className={`filter-icon-arrow-down px-3 ${showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_SORT && 'rorate'}`}></div>
                    </div>
                    {showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_SORT && (
                        <>
                            <div className="menu-sort menu-sort-by-price">
                                <div
                                    className="sort-by-price-item-filter d-start"
                                    onClick={(e) =>
                                        handleSortPrice('price_desc')
                                    }>
                                    <div
                                        className={`d-start link-hover text-left ${dataFilterPriceSortFake ==
                      'price_desc' || dataFilterPriceSortFake == 'price_desc'
                                            ? 'active'
                                            : ''
                                        }`}>
                    Giá từ cao đến thấp
                                    </div>
                                </div>
                                <div
                                    className="sort-by-price-item-filter d-start"
                                    onClick={(e) =>
                                        handleSortPrice('price_asc')
                                    }>
                                    <div
                                        className={`d-start link-hover text-left ${dataFilterPriceSortFake ==
                      'price_asc' || dataFilterPriceSortFake == 'price_asc'
                                            ? 'active'
                                            : ''
                                        }`}>
                    Giá từ thấp đến cao
                                    </div>
                                </div>
                            </div>
                            <FooterFilterMobile
                                handleSubmit={() => handleSubmit()}
                                handleRemoveAll={() => handleRemoveSize()}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
