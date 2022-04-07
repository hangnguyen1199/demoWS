import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import React, { useState, useEffect } from 'react';
import WrapSignIn from './components/wrap-sign-in';
import WrapSignUp from './components/wrap-sign-up';
import { useSelector } from 'react-redux';
/**
 * ****************************************************************************
 * HaiDT SignInContainer CODE
 * index.js
 *
 * description		:
 * created at		:	2021-12-14
 * created by		:	HaiDT
 * package			:	spo\shared\containers\sign-in\index.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const SignInContainer = (props) => {
    const [selected, setSelected] = useState(0);
    const typeLogin = useSelector((state) => state.App.signInSignUpType);
    const [isHiddenTabTitle, setIsHiddenTabTitle] = useState(false);
    useEffect(() => {
        setSelected(typeLogin);
    }, [typeLogin]);
    return (
        <div className="signin-signup">
            <Tabs
                onChange={(index) => setSelected(index)}
                selected={selected}
                id="signin-signup">
                <TabList id="tab-list-signin">
                    {
                        !isHiddenTabTitle && <Tab className="font-weight-normal">Đăng Nhập</Tab>
                    }
                    {
                        !isHiddenTabTitle && <Tab className="font-weight-normal">Đăng Ký</Tab>
                    }
                </TabList>
                <TabPanel>
                    <WrapSignIn changeTab={() => setSelected(1)} />
                </TabPanel>
                <TabPanel>
                    <WrapSignUp onStepChange={(stepIndex) => {
                        if(stepIndex === 2){
                            setIsHiddenTabTitle(true);
                        } else {
                            setIsHiddenTabTitle(false);
                            setSelected(1);
                        }
                    }} 
                    />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default SignInContainer;
