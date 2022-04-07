import React, { useEffect, useState } from 'react'
import FooterFilterMobile from './footer-filter-mobile';
import PriceFilterCommon from '@spo/components/filter/price-filter';
import constants from '@spo/config/constants';
import { useRouter } from 'next/router';

export default function PriceFilterMobile(props) {
    const {
        showFilterMobileType,
        handleShowFilterMobileType,
        handleShowModalFilter
    } = props;
    const [dataFilterPriceFake, setDataFilterPriceFake] = useState({});
    const router = useRouter();
    const handleRemoveSize = () => {
        let params = { ...router.query };
        delete params[constants.ROUTER_NAME.SIZE]
        delete params[constants.ROUTER_NAME.PROMOTION]
        delete params[constants.ROUTER_NAME.PRICE_FROM]
        delete params[constants.ROUTER_NAME.PRICE_TO]
        delete params[constants.ROUTER_NAME.SORT_BY_PRICE]

        router.replace({
            query: params

        })
        handleShowModalFilter(false)
        handleShowFilterMobileType(null)
    }
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
    const renderPrice = () => {
        return <>
            {(router.query[constants.ROUTER_NAME.PRICE_FROM] != 1000000 ||
        router.query[constants.ROUTER_NAME.PRICE_TO] != 0) &&
        (router.query[constants.ROUTER_NAME.PRICE_FROM] != undefined ||
          router.query[constants.ROUTER_NAME.PRICE_TO] != undefined) &&
        (<div className='filter-dot'></div>)}
        </>
    }
    const handlePrice = (e) => {
        let dataFilter = { ...dataFilterPriceFake };
        dataFilter = e;
        setDataFilterPriceFake(dataFilter)
    }
    const handleSubmit = () => {
        let paramRouter = { ...router.query };
        if (dataFilterPriceFake.startPrice || dataFilterPriceFake.endPrice) {
            paramRouter[constants.ROUTER_NAME.PRICE_FROM] = dataFilterPriceFake.startPrice;
            paramRouter[constants.ROUTER_NAME.PRICE_TO] = dataFilterPriceFake.endPrice;
        } else {
            delete paramRouter[constants.ROUTER_NAME.PRICE_FROM];
            delete paramRouter[constants.ROUTER_NAME.PRICE_TO];
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
            <div className=" pointer">
                <div className="filter-sort filter-sort-by-price-slider">
                    <div className="menu-name d-flex" onClick={() =>
                        handleShowFilterMobileType(constants.TYPE_SHOW_FILTER_MOBILE.SHOW_PRICE)}>
                        <span className='d-start'>
                            {renderPrice()}
              Giá
                        </span>
                        <div className={`filter-icon-arrow-down px-3 
            ${showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_PRICE && 'rorate'}`}></div>
                    </div>
                    {showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_PRICE && (
                        <>
                            <div className="menu-sort menu-sort-by-price-slider price-filter-mobile">
                                <PriceFilterCommon
                                    min={0}
                                    max={1000000}
                                    onChange={(e) =>
                                        handlePrice(e)
                                    }
                                    defaultValueStart={Number(dataFilterPriceFake.startPrice)}
                                    defaultValueEnd={Number(dataFilterPriceFake.endPrice)}
                                />
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
