import ColorItem from '@spo/components/item/color-item';
import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Router } from '@spo/routes';
import { arrayToString } from '@spo/lib/helper';
import constants from '@spo/config/constants';
/**
 * ****************************************************************************
 * DUNGNT ColorFilter CODE
 * color-filter.js
 *
 * description		:
 * created at		:	2020-08-23
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\color-filter.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function ColorFilter(props) {
    const { colorMaster, listChecked, includeColor } = props;
    const router = useRouter();
    const [color, setColor] = useState(null);
    const [colors, setColors] = useState([]);
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        if (router.query[constants.PARAM_URL.COLOR]) {
            let newString = router.query[constants.PARAM_URL.COLOR];
            if (newString.includes(',')) {
                let newArr = newString
                    .split(',')
                    .map((e) => Number.parseInt(e));
                setColor(newArr);
            } else {
                setColor([Number.parseInt(newString)]);
            }
        } else {
            setColor([]);
            if (typeof props.onChangeColor == 'function') {
                props.onChangeColor([]);
            }
        }
    }, [router.query[constants.PARAM_URL.COLOR]]);
    useEffect(() => {
        if (typeof props.onChangeColor == 'function') {
            setColor(listChecked);
        }
    }, [listChecked]);
    useEffect(() => {
        // let newList = colorMaster.filter((x) =>
        //     includeColor.includes(x.color_id),
        // );
        setColors(colorMaster);
    }, [colorMaster, includeColor]);
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onChangeColor = (color_id) => {
        if (typeof props.onChangeColor == 'function') {
            let newChecked = [...listChecked];
            const index = newChecked.findIndex((x) => x == color_id);
            if (index != -1) {
                newChecked.splice(index, 1);
            } else {
                newChecked.push(color_id);
            }
            props.onChangeColor(newChecked);
        } else {
            let newChecked = [...color];
            const index = newChecked.findIndex((x) => x == color_id);
            if (index != -1) {
                newChecked.splice(index, 1);
            } else {
                newChecked.push(color_id);
            }

            let data = router.query;
            let stringColor = arrayToString(newChecked);
            if (stringColor == '') {
                delete data[constants.PARAM_URL.COLOR];
            } else {
                data[constants.PARAM_URL.COLOR] = `${stringColor}`;
            }
            data[constants.PARAM_URL.LIMIT] = 12;
            data[constants.PARAM_URL.OFFSET] =
                router[constants.PARAM_URL.OFFSET] ?? 0;
            Router.pushRoute(router.pathname.replace(/\//g, ''), data);
        }
    };
    return (
        <div className="color-filter">
            <div className="d-flex flex-row flex-wrap pb-2">
                {colors?.map((element, index) => {
                    return (
                        <ColorItem
                            title={element.color_name}
                            image={false}
                            key={index}
                            onChange={() => onChangeColor(element.color_id)}
                            active={color?.includes(element.color_id)}
                            color_code={element.color_code}
                        />
                    );
                })}
            </div>
        </div>
    );
}
ColorFilter.propTypes = {
    colorMaster: PropTypes.array,
    listChecked: PropTypes.array,
    includeColor: PropTypes.array,
};
ColorFilter.defaultProps = {
    colorMaster: [],
    listChecked: [],
    includeColor: [],
};
export default ColorFilter;
