import { PropTypes } from 'prop-types';
import React from 'react';
import IconCheckSquareFill from './icon-check-square-fill';
import IconSquare from './icon-square';
import IconCheckbox from './icons/icon-checkbox';
import IconCheckboxFill from './icons/icon-checkbox-fill';
import IconCheckboxFillBlack from './icons/icon-checkbox-fill-black';

/**
 * ****************************************************************************
 * DUNGNT CheckBox CODE
 * check-box.js
 *
 * description		:
 * created at		:	2020-07-31
 * created by		:	DungNT
 * package			:	spo\shared\components\common\check-box.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function CheckBox (props) {
    const { typeValue, isBlackCheckbox } = props
    const onKeyDown = (e) => {
        if (e.keyCode == 13 || e.keyCode == 32) {
            props.onChange(props.checked ? typeValue[1] : typeValue[0]);
        }
    };
    const onChange = () => {
        if (typeof props.onChange == "function") {
            props.onChange(props.checked ? typeValue[1] : typeValue[0]);
        }
    }
    return (
        <div
            id={props?.id}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={` checkbox d-center link-hover checkbox-focus ${props.className ?? ""} ${props?.disabled && 'cb_disabled'}`}
            onClick={onChange}>
            {props.checked ? (isBlackCheckbox ? <IconCheckboxFillBlack /> : <IconCheckboxFill />) : <IconCheckbox />}
        </div>
    );
}
CheckBox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};
CheckBox.defaultProps = {
    checked: false,
    typeValue: [true, false]
};
export default CheckBox;
