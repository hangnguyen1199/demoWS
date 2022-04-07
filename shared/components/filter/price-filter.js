import React, { useEffect, useState , useRef } from 'react';
import Slider from '@material-ui/core/Slider';
import Currency from 'react-currency-formatter';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { Router } from '@spo/routes';
import constants from '@spo/config/constants';
/**
 * ****************************************************************************
 * DUNGNT PriceFilter CODE
 * price-filter.js
 *
 * description		:
 * created at		:	2020-08-23
 * created by		:	DungNT
 * package			:	spo\shared\components\filter\price-filter.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function formatLabel(value) {
    return (
        <div className="d-flex">
            {/* <Currency
                quantity={value}
                currency="VND"
                pattern="##,### !"
                symbol=""
            />
            <span style={{position: 'relative', top: 3, left: 2}} className="fontsize9">VND</span> */}
        </div>
    );
}
function PriceFilter(props) {
    const { min, max, defaultValueStart, defaultValueEnd } = props;
    const [priceFrom, setPriceFrom] = useState(min)
    const [priceTo, setPriceTo] = useState(max)
    const handleChange = (event, newValue) => {
        setPriceFrom(Number.parseInt(newValue[0]))
        setPriceTo(Number.parseInt(newValue[1]))
    };
    const handleChangeCommit = (event, newValue) => {
        props.onChange({ startPrice: newValue[0], endPrice: newValue[1] })
    };

    useEffect(() => {
        if (defaultValueStart) {
            setPriceFrom(defaultValueStart)
        } else {
            setPriceFrom(0)
        }
        if (defaultValueEnd) {
            setPriceTo(defaultValueEnd)
        } else {
            setPriceTo(1000000)
        }
    }, [defaultValueEnd, defaultValueStart])

    return (
        <div className={`price-filter d-flex flex-wrap ${props.className}`}>
            <div className="col-12 px-0 price-filter-bar">
                <span className='price-label price-label-left'>
                    <Currency
                        quantity={Number(priceFrom)}
                        currency="VND"
                        pattern="##,### !"
                        symbol=""
                    />
                </span>
                <Slider
                    value={[priceFrom, priceTo]}
                    step={10000}
                    defaultValue={[Number.parseInt(min), Number.parseInt(max)]}
                    max={max}
                    min={min}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommit}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                    valueLabelFormat={formatLabel}
                />
                <span className='price-label price-label-right'>
                    <Currency
                        quantity={Number(priceTo)}
                        currency="VND"
                        pattern="##,### !"
                        symbol=""
                    />
                </span>
            </div>
        </div>
    );
}
PriceFilter.propsTypes = {
    value: PropTypes.array,
    min: PropTypes.number,
    max: PropTypes.number,
};
PriceFilter.defaultProps = {
    value: [150000, 5000000],
    min: 0,
    max: 0,
};
export default React.memo(PriceFilter);
