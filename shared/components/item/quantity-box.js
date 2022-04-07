import React, { useRef, useEffect, useState } from 'react';
import constants from '@spo/config/constants';
import IconMinus from './../common/icon-minus';
import IconPlus from './../common/icon-plus';
import { PropTypes } from 'prop-types';
import { useIntl } from 'react-intl';

let timeoutEvent = null;
/**
 * ****************************************************************************
 * HaiDT QuantityBox CODE
 * quantity-box.js
 *
 * description		:
 * created at		:	2021-12-12
 * created by		:	HaiDT
 * package			:	spo\shared\components\item\quantity-box.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
function QuantityBox(props) {
    const intl = useIntl()
    const { max, size, value } = props;
    const inputRef = useRef(null);

    const [quantity, setQuantity] = useState(value);

    const onMinus = () => {
        let newVal = quantity - 1 > 0 ? quantity - 1 : 1;
        setQuantity(newVal);
        onClickChangeQuantity(newVal);
    };
    const onPlus = () => {
        if (props.value == max) {
            return;
        }
        let newVal = quantity + 1 <= max ? quantity + 1 : quantity;
        setQuantity(newVal);
        onClickChangeQuantity(newVal);
    };
    const onChangeText = (e) => {
        setQuantity(e.target.value);
        if(props.onChange){
            props.onChange(e.target.value);
        }
    };
    const onBlur = (e) => {
        let result = Number.parseInt(e.target.value, 10)
            ? Number.parseInt(e.target.value, 10)
            : 1;
        if (result < 0) {
            result = 1;
        }
        if (result > max) {
            result = max;
        }

        if(result != e.target.value){
            setQuantity(result);
        }
        if(props.update){
            props.update(result);
        }
        if(props.onChange){
            props.onChange(result);
        }
    };

    useEffect(() => {
        setQuantity(value);
    }, [value]);

    const onClickChangeQuantity = (newVal) => {
        if(props.onChange){
            props.onChange(newVal);
        }
        if (timeoutEvent) {
            clearTimeout(timeoutEvent);
        }
        timeoutEvent = setTimeout(() => {
            if(props.update){
                props.update(newVal);
            }
        }, 700);
    }

    return (
        <div className={`btn-group ${props.disabled && "disabled"}`}>
            <div
                title={intl.formatMessage({
                    id: 'common.minus',
                })}
                disabled={props.value == 1}
                className="btn btn-minus btn-hover-primary rounded-left"
                onClick={onMinus}
                style={{
                    color: 'black',
                    width: size,
                    height: size,
                    backgroundColor:
                        props.value == 1 ? constants.COLOR.GRAY : 'white',
                }}>
                <IconMinus />
            </div>
            <input
                ref={inputRef}
                style={{
                    width: size * 2,
                    height: size,
                    minHeight: size,
                    maxHeight: size,
                }}
                className=" input-number text-center h-100 quantity-input-color"
                value={quantity}
                onChange={onChangeText}
                onBlur={onBlur}
            />

            <div
                title={intl.formatMessage({
                    id: 'common.plus',
                })}
                disabled={props.value == max}
                className="btn btn-plus btn-hover-primary rounded-right"
                onClick={onPlus}
                style={{
                    color: 'black',
                    width: size,
                    height: size,
                    backgroundColor:
                        props.value == max ? constants.COLOR.GRAY : 'white',
                }}>
                <IconPlus />
            </div>
        </div>
    );
}
QuantityBox.propsTypes = {
    max: PropTypes.number,
    size: PropTypes.number,
    value: PropTypes.number,
    update: PropTypes.func,
    onChange: PropTypes.func,
};
QuantityBox.defaultProps = {
    max: constants.MAX_QUANTITY,
    size: 40,
    value: 1,
    onChange: null,
    update: null,
};
export default QuantityBox;
