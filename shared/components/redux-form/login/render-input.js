import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

/**
 * ****************************************************************************
 * DUNGNT RenderInput CODE
 * render-input.js
 *
 * description		:
 * created at		:	2020-07-30
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\login\render-input.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RenderInput (props) {
    const {
        readonly,
        autoComplete,
        input,
        placeholder,
        type,
        maxLength,
        meta: { touched, error, submitFailed },
        icon,
        isShowPassIcon
    } = props;
    const showError = submitFailed && touched && error;
    const [isShowPass, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(isShowPass ? false : true);
    };
    let typeInput = type;
    if (isShowPass) {
        typeInput = "text";
    }
    return (
        <div className={`render-input position-relative ${readonly ? "readonly" : ""}`}>
            <div className="position-relative">
                <div className="render-input-icon">
                    <i style={{fontSize: 25}} className={`${icon}`}></i>
                </div>
                <input
                    readOnly={readonly}
                    tabIndex={0}
                    id={input.name}
                    autoFocus
                    autoComplete={autoComplete.toString()}
                    type={typeInput}
                    {...input}
                    className={`w-100 ${showError ? 'border-danger' : ''}`}
                    placeholder={placeholder}
                    maxLength={maxLength ?? -1}
                    style={{ paddingLeft: 60}}
                />
                <div
                    className="position-absolute d-end pr-2"
                    style={{
                        top: 0,
                        right: 0,
                        width: 60,
                        height: '100%',
                        fontSize: '0.7rem',
                    }}>
                    {isShowPassIcon && !isShowPass &&
                        <i style={{fontSize: 20}} className="fa fa-eye" onClick={togglePasswordVisiblity} ></i>
                    }
                    {isShowPassIcon && isShowPass &&
                        <i style={{fontSize: 20}} className="fa fa-eye-slash" onClick={togglePasswordVisiblity} ></i>
                    }
                </div>
            </div>
            <div className={`error-float ${showError ? '' : 'd-none'} `}>
                <div className="wrap _shadow1">
                    <span className="text-error">{error}</span>
                </div>
            </div>
        </div>
    );
}
RenderInput.propTypes = {
    autoComplete: PropTypes.bool,
    input: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
    maxLength: PropTypes.number,
    readonly: PropTypes.bool,
    icon: PropTypes.string,
    isShowPassIcon: PropTypes.bool
};
RenderInput.defaultProps = {
    autoComplete: true,
    placeholder: 'Nhập ...',
    type: 'text',
    maxLength: -1,
    readonly: false,
};
export default RenderInput;
