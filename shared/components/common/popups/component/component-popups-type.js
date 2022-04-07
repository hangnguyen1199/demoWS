import React from 'react';
import IconX from '@spo/components/common/icon-x';
import ButtonPopup from './../../button-popup';

export default function ComponentPopupsType(props) {
    const {
        payload,
        showVisible,
        icon,
        content,
        showButtonCancel = false,
        titleButton = 'Đóng',
    } = props;
    const handleClosePopup = () => {
        showVisible(false);
    };
    const handleCallBack = () => {
        if (typeof payload.callback == 'function') {
            payload.callback();
        }
    };
    return (
        <div className="container-register-success-popups">
            <div className="flex-center-popups">
                <div className="icon-popups"></div>
                {icon}
                <div className="icon-popups icon-popups-background">
                    <IconX onClick={handleClosePopup} />
                </div>
            </div>
            <div
                style={{ marginTop: '20px' }}
                className="register-popups-content">
                <div className="title-main-content-margin-top">
                    {content}
                    {showButtonCancel ? (
                        <>
                            <ButtonPopup
                                title={payload?.buttonTitle ?? titleButton}
                                onClick={handleCallBack}
                            />
                            <ButtonPopup
                                title={payload?.buttonTitle ?? 'Hủy'}
                                onClick={handleClosePopup}
                                className="button-popup-cancel-white"
                            />
                        </>
                    ) : (
                        <ButtonPopup
                            title={payload?.buttonTitle ?? titleButton}
                            onClick={handleClosePopup}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
