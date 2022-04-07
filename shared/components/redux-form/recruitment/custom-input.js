import React, { useState } from 'react';
import RangeIconUrl from '@spo/public/images/icon/ic_range.svg';
import DropdownIconUrl from '@spo/public/images/icon/ic_dropdown.svg';

/**
 * ****************************************************************************
 * SonMBG CustomInput CODE
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

const CustomInput = (props) => {
    const {
        placeholder,
        input,
        typeIcon = '',
        label,
        type,
        meta: { touched, error },
        icon,
        inputIcon,
        inputStyle,
        style,
        step,
    } = props;
    const showError = touched && error;
    return (
        <React.Fragment>
            <div className="w-100 d-center" style={style}>
                <div className="w-100 d-center">
                    <div className="w-100 position-relative">
                        <div className="d-start">
                            <input
                                {...input}
                                onChange={input?.onChange}
                                onBlur={input?.onBlur}
                                step={step}
                                type={type}
                                className="w-100"
                                placeholder={placeholder}
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
CustomInput.defaultProps = {
    placeholder: 'Nhập',
};
export default CustomInput;
