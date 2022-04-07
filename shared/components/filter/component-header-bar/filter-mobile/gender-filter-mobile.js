import React, { useEffect, useState } from 'react'
import FooterFilterMobile from './footer-filter-mobile'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import constants from '@spo/config/constants';

export default function GenderFilterMobile(props) {
    const {
        showFilterMobileType,
        handleShowFilterMobileType,
        handleShowModalFilter
    }
    = props;
    const common = useSelector(state => state.Common);
    const [dataFilterSex, setDataFilterSex] = useState('');
    const handleSubmit = () => {
        let paramsFilter = { ...router.query };
        let e = dataFilterSex;
        delete paramsFilter[constants.ROUTER_NAME.CATEGORY];
        delete paramsFilter[constants.ROUTER_NAME.SIZE];
        delete paramsFilter[constants.ROUTER_NAME.PRICE_FROM]
        delete paramsFilter[constants.ROUTER_NAME.PRICE_TO]
        delete paramsFilter[constants.ROUTER_NAME.PROMOTION]
        delete paramsFilter[constants.ROUTER_NAME.SORT_BY_PRICE]
        delete paramsFilter[constants.ROUTER_NAME.GENDER];

        if (e != paramsFilter[constants.ROUTER_NAME.GENDER]) {
            paramsFilter[constants.ROUTER_NAME.GENDER] = e;
        }
        if (!e) {
            delete paramsFilter[constants.ROUTER_NAME.GENDER];
        }
        paramsFilter[constants.ROUTER_NAME.PAGE] = 1;
        router.replace({
            query: paramsFilter
        })
        handleShowModalFilter(false)
        handleShowFilterMobileType(null)
    }

    const router = useRouter()

    const handleFilterSexLoad = (e) => {
        if (e == dataFilterSex) {
            setDataFilterSex('');
        } else {
            setDataFilterSex(e)
        }
    }

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.GENDER]) {
            setDataFilterSex(router.query[constants.ROUTER_NAME.GENDER])
        } else {
            setDataFilterSex('')
        }
    }, [router.query[constants.ROUTER_NAME.GENDER]])

    const handleRemoveAll=()=>{
        let paramsFilter = { ...router.query };
        delete paramsFilter[constants.ROUTER_NAME.CATEGORY];
        delete paramsFilter[constants.ROUTER_NAME.SIZE];
        delete paramsFilter[constants.ROUTER_NAME.PRICE_FROM]
        delete paramsFilter[constants.ROUTER_NAME.PRICE_TO]
        delete paramsFilter[constants.ROUTER_NAME.PROMOTION]
        delete paramsFilter[constants.ROUTER_NAME.SORT_BY_PRICE]
        delete paramsFilter[constants.ROUTER_NAME.GENDER];
        paramsFilter[constants.ROUTER_NAME.PAGE] = 1;
        router.replace({
            query: paramsFilter
        })
        handleShowModalFilter(false)
        handleShowFilterMobileType(null);
    }
    return (
        <>
            <div className="pointer">
                <div className="filter-sort filter-sort-by-sex">
                    <div className="menu-name d-flex"
                        onClick={() => handleShowFilterMobileType(constants.TYPE_SHOW_FILTER_MOBILE.SHOW_GENDER)}
                    >
                        <span className='d-start'>
                            {router.query[constants.ROUTER_NAME.GENDER] && (<div className='filter-dot'></div>)}
              Giới tính
                        </span>
                        <div className={`filter-icon-arrow-down px-3 ${showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_GENDER && 'rorate'}`}></div>
                    </div>
                    {showFilterMobileType == constants.TYPE_SHOW_FILTER_MOBILE.SHOW_GENDER && (
                        <div className="menu-sort menu-sort-by-sex">
                            {common.data?.listCategory?.map(
                                (sex, index) => (
                                    <div
                                        key={index}
                                        className="sex-item-filter d-start"
                                        onClick={(e) =>
                                            handleFilterSexLoad(sex.GenderId)
                                        }>
                                        <div
                                            className={`d-start link-hover ${dataFilterSex ==
                        sex.GenderId
                                                ? 'active'
                                                : ''
                                            }`}>
                                            {sex.GenderName}
                                        </div>
                                    </div>
                                )
                            )}
                            <FooterFilterMobile
                                // setShowFilterMobileType={setShowFilterMobileType}
                                // handleShowFilter={handleShowFilter}
                                handleSubmit={() => handleSubmit()}
                                handleRemoveAll={()=>handleRemoveAll()}
                            />
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}
