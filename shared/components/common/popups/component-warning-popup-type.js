import React from 'react';
import ButtonPopup from '../button-popup';
import IconAccountLock from '../icon-account-lock'
import IconX from '../icon-x'

//thêm class "wrap-common-popup-lock" khi gọi component 

function ComponentWarningPopupType(props) {
    const { payload, showVisible,icon,content, button1,button2} = props;
    const handleClosePopup = ()=>{
        showVisible()
    }
    const handleCallBack = () => {
        if (typeof payload.callback == 'function') {
            payload.callback();
        }
    };
    return (
        <div className="container-account-locked-popups">
            <div className="flex-center-popups account-locked-header">
                <div className="account-locked-header-item"></div>
                <div onClick={handleClosePopup} className="icon-popups-background icon-popups account-locked-header-item-close">
                    <IconX />
                </div>
                <div className="account-locked-header-main-icon">
                    {icon}
                </div>
            </div>
            <div className="account-locked-main-content">
                {content}
                {button1 && <ButtonPopup onClick={handleCallBack} title={payload?.buttonTitle ?? button1.title} type={button1.type}/>}
                {button2 && <ButtonPopup onClick={handleClosePopup} title={payload?.buttonTitle ?? button2.title} type={button2.type}/>}
            </div>
        </div>
    );
}

export default ComponentWarningPopupType;