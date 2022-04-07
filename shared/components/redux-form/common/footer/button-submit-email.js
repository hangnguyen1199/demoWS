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
        disabled,
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
            style={{
                backgroundColor: '#FFFFFF',
                paddingLeft: 14,
                paddingRight: 14,
                color: '#F2F2F2;',
                opacity: disabled ? 0.7 : 1,
                borderColor: '#FF2C00',
            }}>
                Đăng ký
        </button>
    );
}
ButtonSubmitEmail.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    fontSize: PropTypes.string,
    className: PropTypes.string,
    tabIndex: PropTypes.number,
    title: PropTypes.oneOfType([PropTypes.string,PropTypes.object]) ,
};
ButtonPrimary.defaultProps = {
    disabled: false,
    fontSize: '1rem',
    className: '',
    tabIndex: 0,
    title: 'Button',
};
export default ButtonPrimary;
