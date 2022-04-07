import React from 'react';
import RangeIconUrl from '@spo/public/images/icon/ic_range.svg';

/**
 * ****************************************************************************
 * SonMBG RenderInput CODE
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

const RenderInput = (props) => {
    const {
        placeholder,
        input,
        label,
        type,
        meta: { touched, error },
        maxLength,
        icon,
        step,
        typeIcon = '',
    } = props;
    const showError = touched && error;
    return (
        <div className={`form-input--wrapper`}>
            <div
                className={`${
                    showError && 'border-error'
                } render-input position-relative`}>
                {label && <label htmlFor={input?.name}>{label}</label>}
                <div className="d-center">
                    <div className="w-100 position-relative">
                        <div className="d-center">
                            <input
                                name={input?.name}
                                {...input}
                                step={step}
                                type={type}
                                className="w-100"
                                placeholder={placeholder}
                                maxLength={maxLength ?? -1}
                            />
                            {typeIcon == 'range' && (
                                <span>
                                    <RangeIcon />
                                </span>
                            )}
                        </div>
                    </div>
                    {icon == 'range' && (
                        <span style={{ marginTop: -20 }}>
                            <RangeIcon />
                        </span>
                    )}
                </div>

                <div className={`error-float ${showError ? '' : 'd-none'} `}>
                    <div className="wrap _shadow1">
                        <span className="text-error">{error}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
RenderInput.defaultProps = {
    placeholder: 'Nhập',
};
export default RenderInput;
