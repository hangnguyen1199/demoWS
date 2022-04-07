import React from 'react';
/**
 * ****************************************************************************
 * SonMBG CustomCheckboxConfirm CODE
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
const CustomCheckboxConfirm = (props) => {
    const {
        placeholder,
        input,
        label,
        type,
        meta: { touched, error },
        maxLength,
        data,
        numOfColumn = 3,
    } = props;
    const showError = touched && error;
    return (
        <div className="d-flex custom-checkbox--row">
            {data?.Label && (
                <span style={{ flex: 2 }}>{masterData?.Label}</span>
            )}
            <div style={{ flex: 5 }} className="custom-checkbox--wrapper">
                {data?.Data?.map((item, idx) => (
                    <div
                        style={{ width: `${100 / numOfColumn}%` }}
                        className="d-flex align-items-start custom-checkbox"
                        key={idx}>
                        <input
                            style={{ marginTop: 5 }}
                            {...input}
                            type="radio"
                            name={data?.Name}
                            id={item?.Name}
                            value={item?.Value}
                        />
                        <label style={{ flex: 1 }} htmlFor={item?.Name}>
                            {item?.Name}
                        </label>
                    </div>
                ))}
                <div></div>
            </div>
            <div className={`error-float ${showError ? '' : 'd-none'} `}>
                <div className="wrap _shadow1">
                    <span className="text-error">{error}</span>
                </div>
            </div>
        </div>
    );
};
CustomCheckboxConfirm.defaultProps = {
    placeholder: 'Nhập',
};
export default CustomCheckboxConfirm;
