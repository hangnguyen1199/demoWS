import { PropTypes } from 'prop-types';
import React from 'react';
import IconGoogle from './icon-google';
/**
* ****************************************************************************
* DUNGNT ButtonLoginGoogle CODE
* button-login-google.js 
* 
* description		:	
* created at		:	2020-07-31 
* created by		:	DungNT 
* package			:	spo\shared\components\common\button-login-google.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/
function ButtonLoginGoogle (props) {
    return (
        <button
            type="button"
            className="button-login-google _custom_btn d-center pointer w-100 "
            onClick={() => props.onClick()}>
            <div>
                <IconGoogle fontSize={25} />
            </div>
            <div className="ml-2">{props.text}</div>
        </button>
    );
}
ButtonLoginGoogle.propTypes = {
    onClick: PropTypes.func,
};
ButtonLoginGoogle.defaultProps = {
    onClick: () => {
        alert('Cần cài đặt sự kiện onClick cho button này');
    },
    text:"Đăng nhập bằng Google"
};
export default ButtonLoginGoogle;
