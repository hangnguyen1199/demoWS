import React from 'react';
import SelectItemType from './../common/select-item-type';
/**
 * ****************************************************************************
 * DUNGNT RenderSelectBox CODE
 * render-select-box.js
 *
 * description		:
 * created at		:	2020-07-19
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\render-select-box.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RenderSelectBox(props) {
    const {
        input,
        label,
        type,
        meta: { touched, error },
    } = props;
    return (
        <div className="render-select-box position-relative">
            <div className="position-relative">
                <SelectItemType
                    {...input}
                    className="form-control _h_30 p-0 select-item-type"
                    dropdownClass="dropdown-class"
                />
            </div>
            <div style={{ position: 'absolute', top: 40, right: 0 }}>
                {touched && error && (
                    <span className="text-error">{error}</span>
                )}
            </div>
        </div>
    );
}
export default RenderSelectBox;
