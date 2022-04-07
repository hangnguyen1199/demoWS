import React, { useState } from 'react';
import CustomCheckboxRow from './custom-checkbox-row';
/**
 * ****************************************************************************
 * SonMBG RenderCheckbox CODE
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
const RenderCheckbox = (props) => {
    const {
        placeholder,
        input,
        label,
        type,
        meta: { touched, error },
        maxLength,
        masterData,
        numOfColumn,
    } = props;
    const [results, setResults] = useState([]);
    const showError = touched && error;
    return (
        <div className={`form-input--wrapper`}>
            <div
                className={`${
                    showError && 'border-error'
                } render-input position-relative`}>
                <label htmlFor={input?.name}>{label}</label>
                <div className="">
                    <div className={`w-100 position-relative`}>
                        <div className="">
                            <CustomCheckboxRow {...props} input={input} data={masterData} />
                        </div>
                    </div>
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
RenderCheckbox.defaultProps = {
    placeholder: 'Nhập',
};
export default RenderCheckbox;
