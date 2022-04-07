import constants from '@spo/config/constants';
import useCustomRoute from '@spo/lib/use-custom-route';
import AppActions from '@spo/redux/app/action';
import CommonActions from '@spo/redux/common/action';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import SignupStep1 from './signup-step1';
import SignupStep2 from './signup-step2';
import VerifyOtp from './verify-otp';

/**
 * ****************************************************************************
 * HaiDT WrapSignUp CODE
 * wrap-sign-up.js
 *
 * description		:
 * created at		:	2020-08-03
 * created by		:	HaiDT
 * package			:	spo\shared\containers\sign-up\components\wrap-sign-up.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */

function WrapSignUp(props) {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const formRegister = useRef(null);
    const {onStepChange} = props;
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        dispatch({ type: CommonActions.LOAD_GENDER });
    }, []);

    useEffect(() => {
        if(onStepChange){
            onStepChange(currentStep);
        }
    }, [currentStep]);

    return (
        <>
            <form
                className="position-relative _custom_screen"
                style={{ minHeight: 500 }}
                ref={formRegister}>
                {currentStep == 1 && (
                    <div>
                        <SignupStep1
                            setPhone={setPhone}
                            setCurrentStep={setCurrentStep}
                        />
                    </div>
                )}
                {currentStep === 2 && (
                    <VerifyOtp phone={phone} setCurrentStep={setCurrentStep} />
                )}
                {currentStep === 3 && (
                    <SignupStep2 setCurrentStep={setCurrentStep} />
                )}
            </form>
        </>
    );
}

WrapSignUp = connect((state) => ({}))(WrapSignUp);
export default WrapSignUp;
