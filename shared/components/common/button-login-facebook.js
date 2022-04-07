import { PropTypes } from 'prop-types';
import React from 'react';
import IconFacebook from './icon-facebook';
/**
 * ****************************************************************************
 * DUNGNT ButtonLoginFacebook CODE
 * button-login-facebook.js
 *
 * description		:
 * created at		:	2020-07-31
 * created by		:	DungNT
 * package			:	spo\shared\components\common\button-login-facebook.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function ButtonLoginFacebook(props) {
    return (
        <button
            disabled={props?.disabled}
            type="button"
            tabIndex="0"
            className={`button-login-facebook _custom_btn d-center pointer w-100 ${
                props?.disabled && 'disabled'
            }`}
            onClick={() => props.onClick()}
        >
            <div>
                <IconFacebook fontSize={25} />
            </div>
            <div className="ml-2">{props?.text}</div>
        </button>
    );
}
ButtonLoginFacebook.propTypes = {
    onClick: PropTypes.func,
};
ButtonLoginFacebook.defaultProps = {
    onClick: () => {
        alert('Cần cài đặt sự kiện onClick cho button này');
    },
    text: 'Đăng nhập bằng Facebook',
};
export default ButtonLoginFacebook;
