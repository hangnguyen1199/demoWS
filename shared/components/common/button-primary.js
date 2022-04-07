import { PropTypes } from 'prop-types';
import React from 'react';
import constants from '../../config/constants';
/**
 * ****************************************************************************
 * DUNGNT ButtonPrimary CODE
 * button-primary.js
 *
 * description		:
 * created at		:	2020-07-31
 * created by		:	DungNT
 * package			:	spo\shared\components\common\button-primary.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function ButtonPrimary(props) {
    const {
        tabIndex,
        className,
        fontSize,
        title,
        disabled,
        height,
        type,
    } = props;
    const onButtonClick = (e) => {
        e.preventDefault();
        if (typeof props.onClick === 'function') {props.onClick();}
    };
    return (
        <button
            disabled={props.disabled}
            type={type ?? 'button'}
            tabIndex={tabIndex}
            onClick={onButtonClick}
            className={`button-primary pointer py-1 h-100 ripple ${className} ${props.disabled ? 'disabled' : ''
            }`}
            style={{
                backgroundColor: '#000',
                border: '1px solid #000',
                borderRadius: '0px !important',
                paddingLeft: 14,
                paddingRight: 14,
                color: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                opacity: disabled ? 0.7 : 1,
            }}>
            <span style={{ fontSize: fontSize ?? '1rem' }}>{title}</span>
        </button>
    );
}
ButtonPrimary.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    fontSize: PropTypes.string,
    className: PropTypes.string,
    tabIndex: PropTypes.number,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
ButtonPrimary.defaultProps = {
    disabled: false,
    fontSize: '1rem',
    className: '',
    tabIndex: 0,
    title: 'Button',
};
export default ButtonPrimary;
