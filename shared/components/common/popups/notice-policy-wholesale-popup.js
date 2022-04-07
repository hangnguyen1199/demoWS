import React from 'react';
import IconUpdateSquare from './../icon-update-square';
import ComponentPopupsType from './component/component-popups-type';

import  Constants  from '@spo/config/constants';

export default function NoticePolicyWholesalePopup(props) {
    const { payload, showVisible } = props;
    const Content = () => {
        return (
            <p className="title-main-content title-main-content-center title-main-content-black">
                <span className="title-main-content-red">{Constants.TITLE_POPUPS.name} </span>đã cập
                nhật mới
                <i className="title-main-content-i"> Chính Sách Bán Sỉ</i>.
            </p>
        );
    };
    return (
        <ComponentPopupsType
            payload={payload}
            showVisible={showVisible}
            content={<Content />}
            icon={<IconUpdateSquare />}
        />
    );
}
