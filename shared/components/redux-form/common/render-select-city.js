import React from 'react';
import { PropTypes } from 'prop-types';
import SelectBox from '@spo/components/common/select-box';
/**
 * ****************************************************************************
 * DUNGNT RenderSelectCity CODE
 * render-select-custom.js
 *
 * description		:
 * created at		:	2020-08-07
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\common\render-select-custom.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RenderSelectCity(props) {
    const {
        showSearch,
        input,
        data,
        placeholder,
        meta: { touched, error, submitFailed },
    } = props;
    const showError = submitFailed && touched && error;
    return (
        <div className="render-select-box position-relative">
            <div className="position-relative">
                <SelectBox
                    showSearch={showSearch}
                    id={input.name}
                    className=" _h_30 p-0 select-gender"
                    dropdownClass="dropdown-class"
                    {...input}
                    placeholder={placeholder}
                    list={data}
                    defaultValue={0}
                    isShowSelectAll={false}
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
RenderSelectCity.propTypes = {
    input: PropTypes.object,
    data: PropTypes.array,
    placeholder: PropTypes.string,
    meta: PropTypes.object,
    showSearch: PropTypes.bool,
};
RenderSelectCity.defaultProps = {
    data: [],
    showSearch: false,
};
export default RenderSelectCity;
