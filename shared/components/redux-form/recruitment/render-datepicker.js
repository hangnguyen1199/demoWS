import React, { useRef } from 'react';
import DatePickerIconUrl from '@spo/public/images/icon/ic_date_picker.svg';
import DatePicker from 'react-datepicker';
import parse from 'date-fns/parse';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * ****************************************************************************
 * SonMBG RenderDatePicker CODE
 * render-datepicker.js
 *
 * description		:
 * created at		:	2021-11-26
 * created by		:	SonMBG
 * package			:	spo\shared\components\redux-form\recruitment\render-datepicker.js
 * copyright		:	Copyright (c) SonMBG
 * version			:	1.0.0
 * ****************************************************************************
 */
const DatePickerIcon = ({ name }) => (
    <label htmlFor={name} style={{ width: 20 }}>
        <img src={DatePickerIconUrl} />
    </label>
);
const RenderDatePicker = (props) => {
    const {
        placeholder = 'Nhập',
        input,
        label,
        type,
        meta: { touched, error },
        maxLength,
        icon,
        input: { name, onChange, value },
        inputIcon,
        maxDate,
    } = props;
    const dateRef = useRef(null);
    const onChangeDate = (val, e) => {
        e.stopPropagation();
        if (val) {
            input.onChange(format(val, 'yyyy-MM-dd'));
        }
    };
    const handleClick = (e) => {
        e.stopPropagation();
        dateRef.current.setOpen(true);
    };
    const showError = touched && error;
    return (
        <label onClick={handleClick} className={`form-input--wrapper w-100`}>
            <div
                className={`${
                    showError && 'border-error'
                } render-input position-relative d-between flex-nowrap`}>
                <div>
                    <label htmlFor={name}>{label}</label>
                    <div className="d-center">
                        <div className="w-100 position-relative">
                            <div className="d-center">
                                {/* <input
                        ref={dateRef}
                        id={name}
                        {...input}
                        type="date"
                        className="w-100"
                        placeholder={placeholder}
                        maxLength={maxLength ?? -1}
                    /> */}
                            </div>
                            <div
                                style={{ cursor: 'pointer' }}
                                className="custom_date_picker pointer">
                                <DatePicker
                                    name={input?.name}
                                    dateFormat="dd/MM/yyyy"
                                    ref={dateRef}
                                    className={props.className ?? 'w-100'}
                                    selected={Date.parse(
                                        parse(input.value, 'yyyy-MM-dd', new Date()),
                                    )}
                                    onChange={onChangeDate}
                                    maxDate={maxDate}
                                    showDisabledMonthNavigation
                                    placeholderText={placeholder}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {icon ? <span>{icon}</span> : <DatePickerIcon name={name} />}
                <div className={`error-float ${showError ? '' : 'd-none'} `}>
                    <div className="wrap _shadow1">
                        <span className="text-error">{error}</span>
                    </div>
                </div>
            </div>
        </label>
    );
};
RenderDatePicker.defaultProps = {
    placeholder: 'Nhập',
};
export default RenderDatePicker;
