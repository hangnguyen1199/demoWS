import React, { useState, useEffect } from 'react'
import IconChevronDown from '@spo/components/common/icon-chevron-down';
import IconCheck from '../../common/icon-check';
import IconGender from '../../common/icon-gender';
import constants from '@spo/config/constants';

;
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function GenderFilter(props) {
    const {
        totalFilter = 0,
        openModal = false,
        handleOpenModalOverlay
    } = props;
    const common = useSelector((state) => state.Common);
    const [dataFilterSex, setDataFilterSex] = useState('');
    const router = useRouter()

    const handleFilterSexLoad = (e) => {
        let paramsFilter = { ...router.query };
        if(!router.query[constants.ROUTER_NAME.HOT_CATEGORY]==constants.TYPE_CATEGORY_HOME['Type']){
            delete paramsFilter[constants.ROUTER_NAME.CATEGORY];
        }
        delete paramsFilter[constants.ROUTER_NAME.SIZE];
        delete paramsFilter[constants.ROUTER_NAME.PRICE_FROM]
        delete paramsFilter[constants.ROUTER_NAME.PRICE_TO]
        delete paramsFilter[constants.ROUTER_NAME.PROMOTION]
        delete paramsFilter[constants.ROUTER_NAME.SORT_BY_PRICE]

        if (e != paramsFilter[constants.ROUTER_NAME.GENDER]) {
            paramsFilter[constants.ROUTER_NAME.GENDER] = e;
        }
        paramsFilter[constants.ROUTER_NAME.PAGE] = 1;
        router.replace({
            query: paramsFilter
        })
    }

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.GENDER]) {
            setDataFilterSex(router.query[constants.ROUTER_NAME.GENDER])
        } else {
            setDataFilterSex('')
        }
    }, [router.query[constants.ROUTER_NAME.GENDER]])

    return (
        <div style={{ position: 'relative' }} className='d-flex flex-row mr-4 pointer align-items-center category-filter-option'>
            <span className='m-0 icon-filter-category'>
                <IconGender className="d-flex align-items-center" />
            </span>
            <p onClick={() =>
                handleOpenModalOverlay()} className='mx-2 m-0 name-category-left'>Giới Tính ({totalFilter})</p>
            <span
                onClick={() =>
                    handleOpenModalOverlay()}
                className='m-0 icon-filter-row'><IconChevronDown /></span>
            <div className={`drop-menu-gender-list cursor-pointer-default 
                ${openModal == constants.TYPE_SUBMIT_FILTER.HANDLE_SUBMIT_GENDER ? '' : ''}`}>
                <div className='drop-menu-gender mt-4'>
                    <div className='w-100 d-flex flex-column pt-1'>
                        <div className='gender-list-item'>

                            {
                                common.data?.listCategory?.map((sex, index) => {
                                    return <div key={index} onClick={() =>
                                        handleFilterSexLoad(sex.GenderId)}
                                    className='d-flex flex-row align-items-center menu-modal-column-item '>
                                        <span className="icon-check-left">
                                            {dataFilterSex ==
                                                sex.GenderId
                                                ? <>
                                                    <IconCheck />
                                                </>
                                                : null
                                            }
                                        </span>
                                        <p style={{ fontWeight: 500 }} className={`fontsize16  menu-name-item ${dataFilterSex ==
                                            sex.GenderId
                                            ? 'active'
                                            : ''
                                        }`}>{sex.GenderName}</p>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


GenderFilter.propTypes = {
    handleRemoveAll: PropTypes.func,
    totalFilter: PropTypes.number
}
export default GenderFilter;