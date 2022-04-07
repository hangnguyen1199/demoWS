import { format } from 'date-fns';
import parse from 'date-fns/parse';
import { PropTypes } from 'prop-types';
import React, { useRef } from 'react';
import DatePicker from 'react-datepicker';
import IconDateCustom from './../../common/icon-date-custom';

import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
/**
 * ****************************************************************************
 * DUNGNT RenderMatDate CODE
 * render-mat-date.js
 *
 * description		:
 * created at		:	2021-12-16
 * created by		:	DungNT
 * package			:	E:\_PROJECT\FMSTYLE\SOURCE\web\shared\components\redux-form\common\render-mat-date.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function RenderMatDate(props) {
    const {
        label = 'Label',
        readonly,
        autoComplete,
        input,
        placeholder,
        type,
        maxLength,
        iconClass,
        meta: { touched, error, submitFailed, pristine },
    } = props;
    const {
        data: { settingMaster },
    } = useSelector((state) => state.Common);
    const showError = touched && error;
    const { maxDate } = props;
    const onChangeDate = (val, e) => {
        const getYear = new Date().getFullYear();
        const valYear = val.getFullYear();
        e.stopPropagation();
        if ((getYear - valYear) < settingMaster?.Setting?.MinAge) {
            input.onChange(format(new Date(), 'dd-MM-yyyy'));
        } else{
            input.onChange(format(val, 'dd-MM-yyyy'));
        }
    };
    const dateRef = useRef(null);
    const handleClick = (e) => {
        e.stopPropagation();
        dateRef.current.setOpen(true);
    };
    return (
        <div
            onClick={handleClick}
            className={`mat-input position-relative ${
                showError ? 'error' : ''
            } ${readonly ? 'readonly' : ''}`}>
            <div className="position-relative wrap_input">
                <label htmlFor="">{label}</label>
                <div className="custom_date_picker pointer">
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        ref={dateRef}
                        className={props.className ?? 'w-100'}
                        selected={Date.parse(
                            parse(input.value, 'dd-MM-yyyy', new Date()),
                        )}
                        onChange={onChangeDate}
                        maxDate={maxDate}
                        showDisabledMonthNavigation
                    />
                </div>
                <div
                    className="icon link-hover"
                    onClick={() => dateRef.current.setOpen(true)}>
                    <IconDateCustom />
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
RenderMatDate.propTypes = {
    autoComplete: PropTypes.bool,
    input: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
    maxLength: PropTypes.number,
    readonly: PropTypes.bool,
};
RenderMatDate.defaultProps = {
    autoComplete: true,
    placeholder: 'Nhập ...',
    type: 'text',
    maxLength: -1,
    readonly: false,
};
export default RenderMatDate;
