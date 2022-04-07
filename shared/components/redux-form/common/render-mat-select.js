import { PropTypes } from 'prop-types';
import React, { useRef, useState } from 'react';
import IconChevronDown from '../../common/icons/icon-chevron-down';
import MatSelect from '../../common/mat-select';

/**
 * ****************************************************************************
 * DUNGNT RenderMatSelect CODE
 * render-mat-select.js
 *
 * description		:
 * created at		:	2021-12-16
 * created by		:	DungNT
 * package			:	E:\_PROJECT\FMSTYLE\SOURCE\web\shared\components\redux-form\common\render-mat-select.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function RenderMatSelect(props) {
    const {
        label = 'Label',
        readonly,
        autoComplete,
        input,
        placeholder,
        type,
        maxLength,
        iconClass,
        showSearch,
        field,
        masterData,
        meta: { touched, error, submitFailed, pristine },
    } = props;
    const ref = useRef(null);
    const [open, setOpen] = useState(false)
    const showError = touched && error;
    const handleClick = () => {
        setOpen(true)
    };
    return (
        <div
            onClick={handleClick}
            className={`mat-input mat-select position-relative ${
                showError ? 'error' : ''
            } ${readonly ? 'readonly' : ''}`}>
            <div className="position-relative wrap_input">
                <label htmlFor="">{label}</label>
                <MatSelect
                    open={open}
                    setOpen={setOpen}
                    readonly={readonly}
                    showSearch={showSearch}
                    id={input.name}
                    className=" _h_30 p-0 select-gender"
                    dropdownClass="dropdown-class"
                    {...input}
                    placeholder={placeholder}
                    data={masterData}
                    field={field}
                    defaultValue={0}
                    isShowSelectAll={false}
                    style={{ paddingLeft: 60 }}
                />
                <div className="icon link-hover">
                    <IconChevronDown />
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
RenderMatSelect.propTypes = {
    autoComplete: PropTypes.bool,
    input: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
    maxLength: PropTypes.number,
    readonly: PropTypes.bool,
};
RenderMatSelect.defaultProps = {
    autoComplete: true,
    placeholder: 'Nhập ...',
    type: 'text',
    maxLength: -1,
    readonly: false,
    showSearch: true,
    field: ['Value', 'Key'],
};
export default RenderMatSelect;
