import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SizeItem from '@spo/components/item/size-item';
import { useRouter } from 'next/router';
import { arrayToString } from '@spo/lib/helper';
import { Router } from '@spo/routes';
import constants from '@spo/config/constants';

/**
 * ****************************************************************************
 * DUNGNT SizeFilter CODE
 * size-filter.js
 *
 * description		:
 * created at		:	2020-08-23
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\size-filter.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function SizeFilter(props) {
    const { sizeMaster, listChecked, includeSize } = props;
    const [size, setSize] = useState([]);
    const router = useRouter();
    const [sizes, setSizes] = useState([]);
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        if (router.query[constants.PARAM_URL.SIZE]) {
            let newString = router.query[constants.PARAM_URL.SIZE];
            if (newString.includes(',')) {
                let newArr = newString.split(',').map((e) => e);
                setSize(newArr);
            } else {
                setSize([newString]);
            }
        } else {
            setSize([]);
            if (typeof props.onChangeSize == 'function') {
                props.onChangeSize([]);
            }
        }
    }, [router.query[constants.PARAM_URL.SIZE]]);
    useEffect(() => {
        if (typeof props.onChangeSize == 'function') {
            setSize(listChecked);
        }
    }, [listChecked]);
    useEffect(() => {
        let newList = sizeMaster;
        if (router.query[constants.PARAM_URL.COLOR]) {
            newList = sizeMaster.filter((x) => includeSize.includes(x.size_id));
        }
        setSizes(newList);
    }, [sizeMaster, includeSize]);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onChangeSize = ({ id, size_name }) => {
        if (typeof props.onChangeSize == 'function') {
            let newChecked = [...listChecked];
            const index = newChecked.findIndex((x) => x == size_name);
            if (index != -1) {
                newChecked.splice(index, 1);
            } else {
                newChecked.push(size_name);
            }
            props.onChangeSize(newChecked);
        } else {
            let newChecked = [...size];
            const index = newChecked.findIndex((x) => x == size_name);
            if (index != -1) {
                newChecked.splice(index, 1);
            } else {
                newChecked.push(size_name);
            }
            let data = router.query;
            let stringSize = arrayToString(
                newChecked.length > 0 ? newChecked : [],
            );
            if (!stringSize) {
                delete data[constants.PARAM_URL.SIZE];
            } else {
                data[constants.PARAM_URL.SIZE] = `${stringSize}`;
            }
            data[constants.PARAM_URL.LIMIT] = 12;
            data[constants.PARAM_URL.OFFSET] =
                router[constants.PARAM_URL.OFFSET] ?? 0;
            Router.pushRoute(router.pathname.replace(/\//g, ''), data);
        }
    };

    return (
        <div className="size-filter">
            <div className="d-flex flex-row flex-wrap pb-2">
                {sizes.map((element, index) => {
                    return (
                        <SizeItem
                            key={index}
                            onChange={onChangeSize}
                            active={size.includes(element.size_name)}
                            item={element}
                        />
                    );
                })}
            </div>
        </div>
    );
}

SizeFilter.propTypes = {
    sizeMaster: PropTypes.array,
    listChecked: PropTypes.array,
    includeSize: PropTypes.array,
};
SizeFilter.defaultProps = {
    sizeMaster: [],
    listChecked: [],
    includeSize: [],
};
export default React.memo(SizeFilter);
