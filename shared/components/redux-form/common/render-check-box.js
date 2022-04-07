import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import CheckBox from './../../common/check-box';

/**
 * ****************************************************************************
 * DUNGNT RenderCheckBox CODE
 * render-check-box.js
 *
 * description		:
 * created at		:	2020-08-07
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\common\render-check-box.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function RenderCheckBox(props) {
    const {
        className,
        input,
        typeValue,
        value
    } = props;
    return (
        <div className={`render-input position-relative ${className}`}>
            <div className="position-relative">
                <CheckBox typeValue={typeValue} checked={value == typeValue[0] ? true : false} />
            </div>
        </div>
    );
}
RenderCheckBox.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    value: PropTypes.bool,
};
RenderCheckBox.defaultProps = {
    value: false,
    typeValue: [true, false]
};
export default RenderCheckBox;
