import React from 'react';
import { PropTypes } from 'prop-types';
import SelectBox from '@spo/components/common/select-box';
/**
 * ****************************************************************************
 * DUNGNT RenderCustomSelect CODE
 * render-select-custom.js
 *
 * description		:
 * created at		:	2020-08-07
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\common\render-custom-select.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RenderCustomSelect(props) {
    const {
        field,
        readonly,
        showSearch,
        input,
        data,
        placeholder,
        image,
        meta: { touched, error, submitFailed },
    } = props;
    const showError = submitFailed && touched && error;
    return (
        <div className="render-select-box position-relative">
            <div className="position-relative">
                <SelectBox
                    field={field}
                    readonly={readonly}
                    showSearch={showSearch}
                    id={input.name}
                    className="p-0 select-gender select-box"
                    dropdownClass="dropdown-class"
                    {...input}
                    placeholder={placeholder}
                    list={data}
                    defaultValue={0}
                    isShowSelectAll={false}
                    error={showError}
                    image={image}
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
RenderCustomSelect.propTypes = {
    input: PropTypes.object,
    data: PropTypes.array,
    placeholder: PropTypes.string,
    meta: PropTypes.object,
    showSearch: PropTypes.bool,
    readonly: PropTypes.bool,
};
RenderCustomSelect.defaultProps = {
    data: [],
    showSearch: false,
    readonly: false,
};
export default RenderCustomSelect;
