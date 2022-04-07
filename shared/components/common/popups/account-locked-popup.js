import React from 'react';
import IconAccountLock from '../icon-account-lock'
import IconX from '../icon-x'

function AccountLockedPopupType(props) {
    const { payload, showVisible,icon,content, button1,button2} = props;
    const handleClick = () => {
        if (typeof payload.callback == 'function') {
            payload.callback();
        }
        showVisible(false);
    };
    return (
        <div className="container-account-locked-popups">
            <div className="flex-center-popups account-locked-header">
                <div className="account-locked-header-item"></div>
                <div className="icon-popups-background icon-popups account-locked-header-item-close">
                    <IconX />
                </div>
                <div className="account-locked-header-main-icon">
                    {icon}
                </div>
            </div>
            <div className="account-locked-main-content">
                {content}
                {button1}
                {button2}
            </div>
        </div>
    );
}

export default AccountLockedPopupType;