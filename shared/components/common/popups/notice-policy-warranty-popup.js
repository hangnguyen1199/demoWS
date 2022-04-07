import React from 'react';
import IconUpdateSquare from '../icon-update-square';
import ComponentPopupsType from './component/component-popups-type';
import  constants  from '@spo/config/constants';

export default function NoticePolicyWarrantyPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <p className="title-main-content title-main-content-center title-main-content-black">
                <span className="title-main-content-red">
                    {constants.TITLE_POPUPS.name}{' '}
                </span>
                đã cập nhật mới{' '}
                <i className="title-main-content-i">
                    Chính Sách Bảo <br /> hành
                </i>
                .
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
