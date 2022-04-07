import constants from '@spo/config/constants';
import { PropTypes } from 'prop-types';
import React from 'react';
/**
 * ****************************************************************************
 * DUNGNT ButtonRed CODE
 * button-dark.js
 *
 * description		:
 * created at		:	2020-08-07
 * created by		:	DungNT
 * package			:	\spo\shared\components\common\button-dark.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function ButtonRed (props) {
    const { tabIndex, className, fontSize, title, disabled, height, type } = props;
    const onClick = () => {
        if (typeof props.onClick === 'function') {props.onClick();}
    };
    return (
        <button
            type={type ?? "button"}
            disabled={disabled}
            onClick={onClick}
            className={`common_btn_red button-focus pointer py-1 h-100 ${className} ${props.disabled ? 'disabled' : ''
            }`}
            style={{
                backgroundColor: constants.COLOR.RED,
                paddingLeft: 14,
                paddingRight: 14,
                color: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                borderRadius: 0
            }}>
            <span style={{ fontSize: props.fontSize ?? '1rem', fontWeight: 500 }}>
                {props.title}
            </span>
        </button>
    );
}

ButtonRed.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    fontSize: PropTypes.number,
    className: PropTypes.string,
    tabIndex: PropTypes.number,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
ButtonRed.defaultProps = {
    disabled: false,
    className: '',
    tabIndex: 0,
    title: 'Button',
};
export default ButtonRed;
