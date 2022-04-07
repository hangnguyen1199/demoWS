import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import SelectBox from '@spo/components/common/select-box';
import constants from '@spo/config/constants';
/**
 * ****************************************************************************
 * DUNGNT RenderCodeDefinitionSelect CODE
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

function RenderCodeDefinitionSelect (props) {
    const {
        readonly,
        showSearch,
        input,
        data,
        placeholder,
        meta: { touched, error, submitFailed },
    } = props;
    const showError = touched && error;
    const [list, setList] = useState([])
    useEffect(() => {
        if (data) {
            let newList = []
            Object.keys(constants[data]).map(key => {
                newList.push({
                    value: constants[data][key].VALUE,
                    code: constants[data][key].CODE,
                })
            })
            setList(newList)
        } else {
            setList([])
        }
    }, [data])
    return (
        <div className="render-select-box position-relative">
            <div className="position-relative">
                <SelectBox
                    field={["value", "code"]}
                    readonly={readonly}
                    showSearch={showSearch}
                    id={input.name}
                    className="p-0 select-box"
                    dropdownClass="dropdown-class"
                    {...input}
                    placeholder={placeholder}
                    list={list}
                    defaultValue={0}
                    isShowSelectAll={false}
                    error={showError}
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
RenderCodeDefinitionSelect.propTypes = {
    input: PropTypes.object,
    data: PropTypes.string,
    placeholder: PropTypes.string,
    meta: PropTypes.object,
    showSearch: PropTypes.bool,
    readonly: PropTypes.bool,
};
RenderCodeDefinitionSelect.defaultProps = {
    data: [],
    showSearch: false,
    readonly: false,
    placeholder:"Chọn ..."
};
export default RenderCodeDefinitionSelect;
