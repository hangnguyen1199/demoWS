import React, { useEffect, useState } from 'react'
import checkExits from '../help';
import FooterFilterMobile from './footer-filter-mobile'
import constants from '@spo/config/constants';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export default function SizeFilterMobile(props) {
    const {
        showFilterMobileType,
        handleShowFilterMobileType,
        handleShowModalFilter
    }
    = props;
    const common = useSelector((state) => state.Common);
    const router = useRouter();
    const [dataFilterSizeFake, setDataFilterSizeFake] = useState([]);
    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.SIZE]) {
            let arraySize = router.query[constants.ROUTER_NAME.SIZE].split(',');
            setDataFilterSizeFake(arraySize)
        } else {
            setDataFilterSizeFake([])
        }
    }, [router.query[constants.ROUTER_NAME.SIZE]])

    const handleRemoveSize = () => {
        let params = { ...router.query };
        delete params[constants.ROUTER_NAME.SIZE]
        delete params[constants.ROUTER_NAME.PROMOTION]
        delete params[constants.ROUTER_NAME.PRICE_FROM]
        delete params[constants.ROUTER_NAME.PRICE_TO]
        delete params[constants.ROUTER_NAME.PRICE_TO]
        delete params[constants.ROUTER_NAME.SORT_BY_PRICE]

        router.replace({
            query: params

        })
        handleShowModalFilter(false)
        handleShowFilterMobileType(null)
    }

    const handleSubmit = () => {
        let paramRouter = { ...router.query };
        if (dataFilterSizeFake.length > 0) {
            paramRouter[constants.ROUTER_NAME.SIZE] = dataFilterSizeFake.join(',');

        } else {
            delete paramRouter[constants.ROUTER_NAME.SIZE]
        }
        paramRouter[constants.ROUTER_NAME.PAGE] = 1;
        router.replace({
            query: paramRouter
        })
        handleShowModalFilter(false)
        handleShowFilterMobileType(null)
    }
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
    return (
        <div className="pointer">
            <div className="filter-sort filter-sort-by-size">
                <div className="menu-name d-flex" onClick={() => handleShowFilterMobileType(constants.TYPE_SHOW_FILTER_MOBILE.SHOW_SIZE)}>
                    <span className='d-start'>
                        {router.query[constants.ROUTER_NAME.SIZE] &&
              router.query[constants.ROUTER_NAME.SIZE].split(',').length > 0 && (<div className='filter-dot'></div>)}
            Size
                    </span>
                    <div className={`filter-icon-arrow-down px-3 ${showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_SIZE && 'rorate'}`}></div>
                </div>
                {showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_SIZE && (
                    <div className="menu-sort menu-sort-by-size">
                        {common?.data?.listSize.map((size, index) => (
                            <div
                                key={size.Id}
                                className="size-item d-start"
                                onClick={(e) =>
                                    handleSizeId(size.Id)
                                }>
                                <div
                                    className={`d-start link-hover ${checkExits(
                                        dataFilterSizeFake,
                                        size.Id
                                    ) > -1
                                        ? 'active'
                                        : ''
                                    }`}>
                                    {size.Name}
                                </div>
                            </div>
                        ))}
                        <FooterFilterMobile
                            handleSubmit={() => handleSubmit()}
                            handleRemoveAll={() => handleRemoveSize()}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
