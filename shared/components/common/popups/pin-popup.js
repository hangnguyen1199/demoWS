import React from 'react';
import ButtonPopup from './../button-popup';
import IconCheckLock from './../icon-check-lock';
import IconX from '@spo/components/common/icon-x';
import ComponentPopupsType from './component/component-popups-type';
// IconCheckLock
export default function PinPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <div className="title-main-content-margin-top">
                <p className="title-main-content title-main-content-center">
                    Mã <span className="title-main-content-black">PIN</span> có
                    tính bảo mật kém. Bạn vui lòng chọn mã{' '}
                    <span className="title-main-content-black">PIN </span>
                    khác an toàn hơn..
                </p>
            </div>
        );
    };
    return (
        <ComponentPopupsType
            showVisible={showVisible}
            payload={payload}
            content={<Content {...props} />}
            icon={<IconCheckLock />}
        />
    );
}
