import React from 'react';
import IconCup from './../icon-cup';
import ComponentPopupsType from './component/component-popups-type';
import  constants  from '@spo/config/constants';

export default function ReachedTopPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <>
                <p className="title-header-success">
                    Chúc mừng bạn đã lọt vào top 100
                </p>
                <p className="title-main-content">
                    Chúc mừng bạn đã lọt vào{' '}
                    <span className="title-main-content-black">
                        TOP 100 Khách Hàng Có Điểm Thứ Hạng Cao Nhất
                    </span>
                    .
                </p>
                <div className="title-main-content-margin-top">
                    <p className="title-main-content">
                        <span className="title-main-content-red">{constants.TITLE_POPUPS.name}</span>{' '}
                        xin tặng bạn:
                    </p>
                    <p className="title-main-content title-main-content-black">. 10 Điểm Bạc</p>
                    <p className="title-main-content title-main-content-black">
                        . Mã Số Mua Hàng giảm 12% (
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
            icon={<IconCup />}
        />
    );
}
