import React, { useState } from 'react';
import ForgotPassowrdStep1 from './forgot-passowrd-step1';
import ForgotPassowrdStep2 from './forgot-passowrd-step2';
import ResetPassword from './reset-password';

/**
* ****************************************************************************
* DUNGNT WrapForgotPassword CODE
* wrap-forgot-password.js 
* 
* description		:	
* created at		:	2021-12-20 
* created by		:	DungNT 
* package			:	shared\containers\forgot-password\components\wrap-forgot-password.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 

function WrapForgotPassword(props) {
    const [currentStep, setCurrentStep] = useState(1);
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    //----------------------------------------------
    // Effect
    //----------------------------------------------

    return (
        <>
            <form
                className="position-relative _custom_screen signin-signup verify-otp"
                style={{ maxWidth: 400, width: '100%' }}>
                {currentStep == 1 && (
                    <ForgotPassowrdStep1 setCurrentStep={setCurrentStep} setEmail={setEmail} />
                )}
                {currentStep == 2 && <ForgotPassowrdStep2 setCurrentStep={setCurrentStep} email={email} setOtp={setOtp} otp={otp} />}
                {currentStep == 3 && <ResetPassword email={email} otp={otp}  />}
            </form>
        </>
    );
}
export default WrapForgotPassword;
