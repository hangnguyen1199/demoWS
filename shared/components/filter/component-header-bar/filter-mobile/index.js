import React, { useState } from 'react'
import Display from './../../../common/display';
import { IconX } from './../../../common/icon-x';
import GenderFilterMobile from './gender-filter-mobile';
import CategoryFilterMobile from './category-filter-mobile';
import SizeFilterMobile from './size-filter-mobile';
import SortFilterMobile from './sort-filter-mobile';
import PriceFilterMobile from './price-filter-mobile';
import PromotionFilterMobile from './promotion-filter-mobile';
import { useDispatch, useSelector } from 'react-redux';
import AppActions from '@spo/redux/app/action';

export default function HeaderFilterMobile(props) {
    const [open, setOpen] = useState(false);
    const { totalFilter } = props;
    const [showFilterMobileWithType, setShowFilterMobileWithType] = useState(null);
    const typeDisplay = useSelector((state) => state.App.typeDisplay);
    const dispatch = useDispatch();
    const handleShowFilter = (val) => {
        setOpen(val)
    }
    function onChangeDisplay(type) {
        dispatch({
            type: AppActions.TOGGLE_CHANGE_TYPE_DISPLAY,
            data: type,
        });
    }
    const handleShowFilterMobileType = (val) => {
        if (showFilterMobileWithType === val) {
            setShowFilterMobileWithType(null)
        } else {
            setShowFilterMobileWithType(val);
        }
    }
    return (
        <>
            <Display mobile={true}>
                {props.isShowFilter && (
                    <div style={{ padding: "0 15px" }} className='d-flex justify-content-between flex-row'>
                        <div className='d-center' style={{ width: '100%', height: 35,marginTop:"30px", border: "1px solid #707070" }}>
                            <div
                                className="w-100 d-center"
                                onClick={() => handleShowFilter(true)}
                            >
                                {Number(totalFilter.totalCategory) +
                                    Number(totalFilter.totalGender) +
                                    Number(totalFilter.totalSize) > 0
                                    && (<img src='/images/icon/tick-black.svg' style={{ width: 11, marginRight: 4 }} />)}Bộ lọc
                            </div>
                        </div>
                        {open && (
                            <div className={`custom-modal-filter-header-bar`}>
                                <div className="modal__inner-header-bar ">
                                    <div className="modal__header">
                                        <span className='w-100 text-center title'>Bộ lọc</span>
                                        <span style={{ position: 'absolute', right: 30 }}
                                            onClick={() => handleShowFilter(false)}
                                        >
                                            <IconX fontSize={30} color={"#707070"} />
                                        </span>
                                    </div>
                                    <div className="modal__content">
                                        <div className="filter-header-bar d-flex align-items-start">
                                            <div className="d-flex flex-column item">
                                                {props.isShowSortSex && (
                                                    <GenderFilterMobile
                                                        handleShowModalFilter={handleShowFilter}
                                                        showFilterMobileType={showFilterMobileWithType}
                                                        handleShowFilterMobileType={handleShowFilterMobileType}
                                                    />
                                                )}
                                                {props.isShowSortCategory && (
                                                    <CategoryFilterMobile
                                                        handleShowModalFilter={handleShowFilter}
                                                        showFilterMobileType={showFilterMobileWithType}
                                                        handleShowFilterMobileType={handleShowFilterMobileType}
                                                        typeCategory={props.typeCategory}
                                                    />
                                                )}

                                                {props.isShowSortSize && (
                                                    <SizeFilterMobile
                                                        handleShowModalFilter={handleShowFilter}
                                                        showFilterMobileType={showFilterMobileWithType}
                                                        handleShowFilterMobileType={handleShowFilterMobileType}

                                                    />
                                                )}
                                                {props.isShowSortByPrice && (
                                                    <SortFilterMobile
                                                        handleShowModalFilter={handleShowFilter}
                                                        showFilterMobileType={showFilterMobileWithType}
                                                        handleShowFilterMobileType={handleShowFilterMobileType}
                                                    />
                                                )}

                                                {props.isShowSortPrice && (
                                                    <PriceFilterMobile
                                                        handleShowModalFilter={handleShowFilter}
                                                        showFilterMobileType={showFilterMobileWithType}
                                                        handleShowFilterMobileType={handleShowFilterMobileType}
                                                    />
                                                )}
                                                {props.isShowSortByPrice && (
                                                    <PromotionFilterMobile
                                                        handleShowModalFilter={handleShowFilter}
                                                        showFilterMobileType={showFilterMobileWithType}
                                                        handleShowFilterMobileType={handleShowFilterMobileType}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* <div className="change-display-list-item pointer d-flex">
                            <img
                                className={`${typeDisplay === 5 ? 'active' : ''
                                } hover-color-svg`}
                                src="/images/icon/display-list.svg"
                                onClick={() => onChangeDisplay(5)}
                            />
                            <img
                                className={`${typeDisplay === 3 ? 'active' : ''
                                } pl-3 hover-color-svg`}
                                src="/images/icon/display-gird.svg"
                                onClick={() => onChangeDisplay(3)}
                            />
                        </div> */}
                    </div>
                )}
            </Display>
        </>
    )
}
