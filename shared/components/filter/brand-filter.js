import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Router } from '@spo/routes';
import { arrayToString } from '@spo/lib/helper';
import IconClose from '@spo/components/common/icon-close';
import constants from '@spo/config/constants';

/**
 * ****************************************************************************
 * DUNGNT BrandFilter CODE
 * brand-filter.js
 *
 * description		:
 * created at		:	2020-09-24
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\brand-filter.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function BrandFilter(props) {
    const { brandMaster, value } = props;
    const router = useRouter();
    const [brand, setBrand] = useState([]);

    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        if (router.query[constants.PARAM_URL.BRAND]) {
            let newString = router.query[constants.PARAM_URL.BRAND];
            if (newString.includes(',')) {
                let newArr = newString
                    .split(',')
                    .map((e) => Number.parseInt(e));
                setBrand(newArr);
            } else {
                setBrand([Number.parseInt(newString)]);
            }
        } else {
            setBrand([]);
        }
    }, [router.query[constants.PARAM_URL.BRAND]]);
    useEffect(() => {
        if (typeof props.onRemove == 'function') {
            setBrand(value);
        }
    }, [value]);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const handleRemoveBrand = (id) => {
        if (typeof props.onRemove == 'function') {
            props.onRemove(id);
        } else {
            let data = { ...router.query };
            let newList = [...brand];
            let index = newList.findIndex((x) => x == id);
            if (index != -1) {
                newList.splice(index, 1);
            }

            if (newList.length > 0) {
                data[constants.PARAM_URL.BRAND] = arrayToString(newList);
            } else {
                delete data[constants.PARAM_URL.BRAND];
            }
            Router.pushRoute(router.pathname.replace(/\//g, ''), data);
        }
    };
    return (
        <div className="brand-filter widget-content">
            {brand?.length > 0 &&
                brand?.map((item, index) => (
                    <div className="d-between mb-1" key={index}>
                        <span>
                            {
                                brandMaster[
                                    brandMaster.findIndex(
                                        (x) => x.brand_id == item,
                                    )
                                ]?.brand_name
                            }
                        </span>
                        <div
                            className={`link-hover ${
                                router.pathname == '/brand' ? 'disabled' : ''
                            }`}
                            onClick={() => {
                                handleRemoveBrand(item);
                            }}>
                            <IconClose fontSize="16" />
                        </div>
                    </div>
                ))}
        </div>
    );
}
export default BrandFilter;
