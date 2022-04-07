import React, { useEffect, useState } from "react";
/**
 * ****************************************************************************
 * SonMBG CustomCheckboxRow CODE
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
const CustomCheckboxRow = (props) => {
    const {
        placeholder,
        input,
        label,
        rowLabel,
        type,
        meta: { touched, error },
        maxLength,
        data,
        fieldName = "Name",
        fieldValue = "Value",
        numOfColumn = 3,
    } = props;
    const [checked, setChecked] = useState(0);
    const showError = touched && error;

    useEffect(() => {
        input.onChange(data[0][fieldValue]);
    }, []);
    const onChange = (item) => {
        console.log("Change", item[fieldValue]);
        input.onChange(item[fieldValue]);
    };
    return (
        <div className="d-flex custom-checkbox--row">
            {rowLabel && (
                <span style={{ flex: 1, marginLeft: 20 }}>
                    {rowLabel}
                </span>
            )}
            <div style={{ flex: 4 }} className="custom-checkbox--wrapper">
                {data &&
					data?.map((item, idx) => (
					    <div
					        onClick={() => setChecked(idx)}
					        style={{ width: `${100 / numOfColumn}%` }}
					        className="d-center custom-checkbox"
					        key={idx}
					    >
					        <input
					            {...input}
					            type="radio"
					            name={input?.name}
					            onChange={() => onChange(item)}
					            id={item?.Name}
					            value={item?.Value}
					            checked={`${checked == idx ? "checked" : ""}`}
					        />
					        <label
					            style={{
					                flex: 1,
					                whiteSpace: "nowrap",
					                fontWeight: checked == idx ? "400" : "300",
					            }}
					            htmlFor={item?.Name}
					        >
					            {item?.Name}
					        </label>
					    </div>
					))}
                {numOfColumn < 4 && <div></div>}
            </div>
            <div className={`error-float ${showError ? "" : "d-none"} `}>
                <div className="wrap _shadow1">
                    <span className="text-error">{error}</span>
                </div>
            </div>
        </div>
    );
};
CustomCheckboxRow.defaultProps = {
    placeholder: "Nhập",
};
export default CustomCheckboxRow;
