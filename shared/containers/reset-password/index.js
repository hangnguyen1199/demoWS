import React from 'react';
import WrapResetPassword from './components/wrap-reset-password';

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
        <div className="reset-password-container py-5" style={{ minHeight: '100vh' }}>
            <WrapResetPassword />
        </div>
    );
};

export default SignInContainer;
