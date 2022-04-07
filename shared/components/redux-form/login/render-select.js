import React from 'react';
import SelectGender from './../../common/select-gender';
import { PropTypes } from 'prop-types';

/**
 * ****************************************************************************
 * DUNGNT RenderSelect CODE
 * render-select.js
 *
 * description		:
 * created at		:	2020-07-31
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\login\render-select.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RenderSelect(props) {
    const {
        input,
        data,
        placeholder,
        meta: { touched, error, submitFailed },
    } = props;
    const showError = submitFailed && touched && error;
    return (
        <div className="render-select-box position-relative">
            <div className="position-relative">
                <SelectGender
                    id={input.name}
                    {...input}
                    data={data}
                    className=" _h_30 p-0 select-gender"
                    dropdownClass="dropdown-class"
                    placeholder={placeholder}
                />
            </div>
            <div className={`error-float ${showError ? '' : 'd-none'} `}>
                <div className="wrap _shadow1">
                    <span className="text-error">{error}</span>
                </div>
            </div>
        </div>
    );
}
RenderSelect.propTypes = {
    input: PropTypes.object,
    data: PropTypes.array,
    placeholder: PropTypes.string,
    meta: PropTypes.object,
};
RenderSelect.defaultProps = {
    data: [],
};
export default RenderSelect;
