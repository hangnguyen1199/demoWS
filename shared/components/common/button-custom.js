import PropTypes from 'prop-types';
import React from 'react';

/**
 * ****************************************************************************
 * DUNGNT ButtonCustom CODE
 * button-custom.js
 *
 * description		:
 * created at		:	2020-08-15
 * created by		:	DungNT
 * package			:	spo\shared\components\common\button-custom.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function ButtonCustom (props) {
    const { type, disabled } = props
    return (
        <button
            type={type ?? "button"}
            disabled={disabled}
            onClick={() => props.onClick()}
            className={`button_custom px-2 ripple ${props.className} _custom_btn`}
            style={{
                backgroundColor: props.backgroundColor ?? '#f29d21',
                height: props.height ?? 30,
                borderRadius: props.borderRadius ?? 0,
                color: props.color ?? 'white',
            }}>
            {props.children}
        </button>
    );
}
ButtonCustom.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
};
ButtonCustom.defaultProps = {
    onClick: () => alert('Chưa cài đặt sự kiện'),
    className: ""
};
export default ButtonCustom;
