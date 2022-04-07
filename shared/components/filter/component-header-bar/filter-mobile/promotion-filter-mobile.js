import React, { useEffect, useState } from 'react'
import FooterFilterMobile from './footer-filter-mobile';
import constants from '@spo/config/constants';
import { useRouter } from 'next/router';

export default function PromotionFilterMobile(props) {
    const {
        showFilterMobileType,
        handleShowFilterMobileType,
        handleShowModalFilter
    } = props;
    const router = useRouter()
    const [dataFilterPromotionFake, setDataFilterPromotionFake] = useState([]);

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.PROMOTION]) {
            setDataFilterPromotionFake(router.query[constants.ROUTER_NAME.PROMOTION].split(','))
        } else {
            setDataFilterPromotionFake([]);
        }
    }, [router.query[constants.ROUTER_NAME.PROMOTION]])
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
        delete params[constants.ROUTER_NAME.PROMOTION]

        router.replace({
            query: params

        })
        handleShowModalFilter(false)
        handleShowFilterMobileType(null)
    }

    const handleSubmit = () => {
        let paramRouter = { ...router.query };
        if (dataFilterPromotionFake.length > 0) {
            paramRouter[constants.ROUTER_NAME.PROMOTION] = dataFilterPromotionFake.join(',');
        } else {
            delete paramRouter[constants.ROUTER_NAME.PROMOTION]
        }
        paramRouter[constants.ROUTER_NAME.PAGE] = 1;
        router.replace({
            query: paramRouter
        })
        handleShowModalFilter(false)
        handleShowFilterMobileType(null)
    }

    function checkExitsArray(list, id) {
        if (list) {
            let index = list.findIndex(v => v == id);
            if (index !== -1) {
                return true;
            }
            return false;
        }
    }
    return (
        <>
            <div className="pointer">
                <div className="filter-sort filter-sort-by-price ">
                    <div className="menu-name d-flex" onClick={() => handleShowFilterMobileType(constants.TYPE_SHOW_FILTER_MOBILE.SHOW_PROMOTION)}>
                        <span className='d-start'>
                            {router.query[constants.ROUTER_NAME.PROMOTION] &&
                                router.query[constants.ROUTER_NAME.PROMOTION].split(',').length > 0 && (<div className='filter-dot'></div>)}
                            Khuyến mãi
                        </span>
                        <div className={`filter-icon-arrow-down px-3 ${showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_PROMOTION && 'rorate'}`}></div>
                    </div>
                    {showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_PROMOTION && (
                        <>
                            <div className="menu-sort menu-sort-by-price">
                                <div
                                    className="sort-by-price-item-filter d-start"
                                    onClick={() =>
                                        handlePromotion(constants.TYPE_SEARCH
                                            .PROMOTION
                                            .PROMOTION_GOLDEN_HOUR)
                                    }>
                                    <div
                                        className={`d-start link-hover text-left ${checkExitsArray(
                                            dataFilterPromotionFake,
                                            constants.TYPE_SEARCH
                                                .PROMOTION
                                                .PROMOTION_GOLDEN_HOUR
                                        )
                                            ? 'active'
                                            : ''
                                        }`}>
                                        Giờ vàng
                                    </div>
                                </div>
                                <div
                                    className="sort-by-price-item-filter d-start"
                                    onClick={() =>
                                        handlePromotion(constants.TYPE_SEARCH
                                            .PROMOTION
                                            .PROMOTION_SUPPER_SALE)
                                    }>
                                    <div
                                        className={`d-start link-hover text-left ${checkExitsArray(
                                            dataFilterPromotionFake,
                                            constants.TYPE_SEARCH
                                                .PROMOTION
                                                .PROMOTION_SUPPER_SALE
                                        )
                                            ? 'active'
                                            : ''
                                        }`}>
                                        Siêu sale
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
