import React from 'react';
import IconUpdateSquare from '../icon-update-square';
import ComponentPopupsType from './component/component-popups-type';
import  constants  from '@spo/config/constants';

export default function PrivacyPolicyPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <p className="title-main-content title-main-content-center">
                <span className="title-main-content-red">
                    {constants.TITLE_POPUPS.name}{' '}
                </span>
                đã cập nhật
                <i className="title-main-content-i">
                    {' '}
                    Chính Sách Bảo Mật & <br /> Chia Sẻ Thông Tin,{' '}
                </i>{' '}
                để tiếp tục hãy bấm đồng <br /> ý.
            </p>
        );
    };
    return (
        <ComponentPopupsType
            payload={payload}
            showVisible={showVisible}
            content={<Content {...props} />}
            icon={<IconUpdateSquare />}
        />
    );
}
