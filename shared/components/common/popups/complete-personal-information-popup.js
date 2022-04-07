import React from 'react';
import IconUserCircle from './../icon-user-cricle';
import ComponentPopupsType from './component/component-popups-type';
import Constants from '@spo/config/constants';

export default function CompletePersonalInformationPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <>
                <p className="title-header-success">
                    Bạn đã hoàn thành thông tin cá nhân
                </p>
                <div>
                    <p className="title-main-content">
                        <span className="title-main-content-red">
                            {Constants.TITLE_POPUPS.name}
                        </span>{' '}
                        xin tặng bạn:
                    </p>
                    <p className="title-main-content title-main-content-black">
                        . 200 Điểm Bạc
                    </p>
                    <p className="title-main-content title-main-content-black">
                        . 01 Mã Số Mua Hàng giảm 12% (
                        <span className="title-main-content-red">
                            123456789
                        </span>
                        )
                    </p>
                </div>
            </>
        );
    };

    return (
        <ComponentPopupsType
            payload={payload}
            showVisible={showVisible}
            content={<Content {...props} />}
            icon={<IconUserCircle />}
        />
    );
}
