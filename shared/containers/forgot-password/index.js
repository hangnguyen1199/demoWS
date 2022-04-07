import React from 'react';
import WrapForgotPassword from './components/wrap-forgot-password';

/**
 * ****************************************************************************
 * DUNGNT LoginContainer CODE
 * index.js
 *
 * description		:
 * created at		:	2020-07-30
 * created by		:	DungNT
 * package			:	C:\Outfiz_Shop\spo\shared\containers\login\index.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

const SignInContainer = (props) => {
    return (
        <div className="reset-password-container">
            <WrapForgotPassword />
        </div>
    );
};

export default SignInContainer;
