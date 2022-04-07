import { PropTypes } from 'prop-types';
import React from 'react';
import constants from '../../config/constants';
/**
 * ****************************************************************************
 * DUNGNT ButtonLarge CODE
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
function ButtonLarge(props) {
    const {
        tabIndex,
        className,
        fontSize,
        title,
        disabled,
        image,
        type,
    } = props;
    const onButtonClick = (e) => {
        e.preventDefault();
        if (typeof props.onClick === 'function') {props.onClick();}
    };
    return (
        <button
            className={`button-focus _custom_btn pointer py-1 ripple ${className}`}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                border: 'solid 1px #707070',
                borderRadius: 4
            }}>
            <span className="pr-1"><img src={image} /></span>
            <span className="pl-1" style={{ fontSize: 12 }}>{title}</span>
        </button>
    );
}
ButtonLarge.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    fontSize: PropTypes.string,
    className: PropTypes.string,
    tabIndex: PropTypes.number,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
ButtonLarge.defaultProps = {
    disabled: false,
    fontSize: '1rem',
    className: '',
    tabIndex: 0,
    title: 'Button',
};
export default ButtonLarge;
