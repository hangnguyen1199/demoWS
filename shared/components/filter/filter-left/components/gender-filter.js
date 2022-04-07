import React, { useEffect, useState } from 'react';
import IconChevronDown from '../../../common/icon-chevron-down';
import IconChevronUp from '@spo/components/common/icon-chevron-up';
import IconCircleFilter from '../../../common/icon-circle-filter';
import IconCircleFilterCheck from '../../../common/icon-circle-filter-check';
import { useSelector } from 'react-redux';
import constants from '@spo/config/constants';
import { useRouter } from 'next/router';
import IconFeatherPlus from '../../../common/icon-feather-plus';
import IconFeatherPlusShow from '../../../common/icon-feather-plus-show';

function GenderFilter(props) {
    const [open, setOpen] = useState(true);
    const [dataFilterSex, setDataFilterSex] = useState('');
    const handleClickAccordion = () => {
        setOpen(!open);
    };
    const common = useSelector((state) => state.Common);
    const router = useRouter();
    const handleFilterSexLoad = (e) => {
        let paramsFilter = { ...router.query };
        // if (
        //     !router.query[constants.ROUTER_NAME.HOT_CATEGORY] ==
        //     constants.TYPE_CATEGORY_HOME['Type']
        // ) {
        //     delete paramsFilter[constants.ROUTER_NAME.CATEGORY];
        // }
        delete paramsFilter[constants.ROUTER_NAME.CATEGORY];
        delete paramsFilter[constants.ROUTER_NAME.SIZE];
        delete paramsFilter[constants.ROUTER_NAME.PRICE_FROM];
        delete paramsFilter[constants.ROUTER_NAME.PRICE_TO];
        delete paramsFilter[constants.ROUTER_NAME.PROMOTION];
        delete paramsFilter[constants.ROUTER_NAME.SORT_BY_PRICE];

        if (e != paramsFilter[constants.ROUTER_NAME.GENDER]) {
            paramsFilter[constants.ROUTER_NAME.GENDER] = e;
        }else{
            // delete paramsFilter[constants.ROUTER_NAME.GENDER];
        }
        paramsFilter[constants.ROUTER_NAME.PAGE] = 1;
        router.replace({
            query: paramsFilter,
        });
    };

    useEffect(() => {
        if (router.query[constants.ROUTER_NAME.GENDER]) {
            setDataFilterSex(router.query[constants.ROUTER_NAME.GENDER]);
        } else {
            setDataFilterSex('');
        }
    }, [router.query[constants.ROUTER_NAME.GENDER]]);
    return (
        <div className={`accordion-filter ${props.className}`}>
            <div
                onClick={handleClickAccordion}
                className="accordion-filter-title"
            >
                <p>Giới tính</p>
                <span>{open ? <IconFeatherPlus /> : <IconFeatherPlusShow />}</span>
            </div>
            <div
                className={`accordion-filter-main accordion-filter-main-details ${
                    open ? 'active' : ''
                }`}
            >
                <div className="accordion-filter-main-up">
                    {common.data?.listCategory?.map((sex, index) => {
                        return (
                            <div key={index}
                                onClick={() =>
                                    handleFilterSexLoad(sex.GenderId)
                                }
                                className="accordion-filter-main-item"
                            >
                                {dataFilterSex == sex.GenderId ? (
                                    <>
                                        <IconCircleFilterCheck fontSize={11} />
                                    </>
                                ) : (
                                    <IconCircleFilter fontSize={11} />
                                )}
                                <p>{sex.GenderName}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
GenderFilter.propsType = {};
export default GenderFilter;
