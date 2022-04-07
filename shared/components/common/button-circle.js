import { PropTypes } from 'prop-types';
import React from 'react';
import constants from '../../config/constants';
/**
 * ****************************************************************************
 * DUNGNT ButtonCircle CODE
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
function ButtonCircle(props) {
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
            className='button-circle'>
            <span>

            </span>
        </button>
    );
}
ButtonCircle.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    fontSize: PropTypes.string,
    className: PropTypes.string,
    tabIndex: PropTypes.number,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
ButtonCircle.defaultProps = {
    disabled: false,
    fontSize: '1rem',
    className: '',
    tabIndex: 0,
};
export default ButtonCircle;
