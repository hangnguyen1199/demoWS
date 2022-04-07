import React, { useEffect, useRef, useState } from 'react';
import IconChevronDown from '../../../common/icon-chevron-down';
import useOnClickOutside from '@spo/lib/use-onclick-outside';
import IconCheck from './../../../common/icon-check';
import { useRouter } from 'next/router';
import constants from '@spo/config/constants';
import IconChevronUp from '@spo/components/common/icon-chevron-up';

function SortPriceFilter(props) {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const router = useRouter();
    useOnClickOutside(ref, () => {
        setOpen(false);
    });
    const handleFilter = (e) => {
        // setOpen(false);

        let dataParams = { ...router.query };
        let dataSort = dataParams[constants.ROUTER_NAME.SORT_BY_PRICE];

        if (dataSort == e) {
            // dataSort = '';
        } else {
            dataSort = e;
        }

        dataParams[constants.ROUTER_NAME.PAGE] = 1;
        if(dataSort){
            dataParams[constants.ROUTER_NAME.SORT_BY_PRICE] = dataSort;
        }else{
            // delete dataParams[constants.ROUTER_NAME.SORT_BY_PRICE]
        }
        router.replace({
            query: dataParams
        })
    };
    return (
        <>
            <div ref={ref} className="d-flex flex-column drop-menu-by-filter">
                <div
                    onClick={() => setOpen(!open)}
                    className="dropdown-sort-filter"
                >
                    {
                        !router.query[constants.ROUTER_NAME.SORT_BY_PRICE]  ? <p className='text-truncate'>{constants.SORT_FILTER.PRICE_ASC['NAME']}</p> : <p className='text-truncate'>
                            {
                                router.query[constants.ROUTER_NAME.SORT_BY_PRICE]== constants.SORT_FILTER.PRICE_DESC['VALUE'] ? 
                                    <p>{constants.SORT_FILTER.PRICE_DESC['NAME']}</p> : <p>{constants.SORT_FILTER.PRICE_ASC['NAME']}</p>
                            }
                        </p>
                    }
                    {
                        !open ? <IconChevronDown /> : <IconChevronUp />
                    }
                </div>
                {open ? (
                    <div className="dropdown-main-filter">
                        <div
                            onClick={() => handleFilter(constants.SORT_FILTER.PRICE_DESC['VALUE'])}
                            className="dropdown-main-item"
                        >
                            <span>
                                {
                                    router.query[constants.ROUTER_NAME.SORT_BY_PRICE] == constants.SORT_FILTER.PRICE_DESC['VALUE'] ? <IconCheck /> : <></>
                                }
                            </span>
                            <p>{constants.SORT_FILTER.PRICE_DESC['NAME']}</p>
                        </div>
                        <div
                            onClick={() => handleFilter(constants.SORT_FILTER.PRICE_ASC['VALUE'])}
                            className="dropdown-main-item"
                        >
                            <span>
                                {
                                    router.query[constants.ROUTER_NAME.SORT_BY_PRICE] == constants.SORT_FILTER.PRICE_ASC['VALUE'] ? <IconCheck /> : <></>
                                }
                            </span>
                            <p>{constants.SORT_FILTER.PRICE_ASC['NAME']}</p>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
export default SortPriceFilter;
