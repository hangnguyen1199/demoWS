import React, { useState } from 'react';
import RangeIconUrl from '@spo/public/images/icon/ic_range.svg';
import DropdownIconUrl from '@spo/public/images/icon/ic_dropdown.svg';
import { FormattedNumber } from 'react-intl';
import {
    convertToCurrency,
    convertToCurrencyDot,
    convertToNumber,
    normalizeCurrency,
} from '../../../library/helper';
/**
 * ****************************************************************************
 * SonMBG CustomCurrencyInput CODE
 * render-input.js
 *
 * description		:
 * created at		:	2021-11-22
 * created by		:	SonMBG
 * package			:	spo\shared\components\redux-form\recruitment\render-input.js
 * copyright		:	Copyright (c) SonMBG
 * version			:	1.0.0
 * ****************************************************************************
 */
const RangeIcon = () => <img src={RangeIconUrl} />;
const DropdownIcon = () => <img src={DropdownIconUrl} />;

const CustomCurrencyInput = (props) => {
    const {
        placeholder,
        input,
        typeIcon = '',
        label,
        type,
        meta: { touched, error },
        maxLength = 255,
        icon,
        inputIcon,
        inputStyle,
        style,
        step,
    } = props;
    const [value, setValue] = useState('');
    const showError = touched && error;
    const onChange = (e) => {
        input.onChange(convertToNumber(e.target.value));

        if (props.isDot) {
            setValue(convertToCurrencyDot(convertToNumber(e.target.value, '.')));
        } else {
            setValue(convertToCurrency(convertToNumber(e.target.value)));
        }

    };
    return (
        <React.Fragment>
            <div className="d-center" style={style}>
                <div className="d-center">
                    <div className="w-100 position-relative">
                        <div className="d-center">
                            <input
                                {...input}
                                step={step}
                                type={type}
                                onBlur={onChange}
                                onChange={onChange}
                                className="w-100"
                                placeholder={placeholder}
                                maxLength={maxLength ?? -1}
                                value={value}
                            />
                            {inputIcon && <span>input Icon</span>}
                            <div
                                style={{ top: 25 }}
                                className={`error-float ${showError ? '' : 'd-none'} `}>
                                <div className="wrap _shadow1">
                                    <span className="text-error">{error}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {typeIcon == 'dropdown' && (
                    <span>
                        <DropdownIcon />
                    </span>
                )}
                {typeIcon == 'range' && (
                    <span>
                        <RangeIcon />
                    </span>
                )}
            </div>
        </React.Fragment>
    );
};
CustomCurrencyInput.defaultProps = {
    placeholder: 'Nhập',
    isDot: false
};
export default CustomCurrencyInput;
