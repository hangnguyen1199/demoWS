import React from 'react';
import IconCup from './../icon-cup';
import ComponentPopupsType from './component/component-popups-type';
import  constants  from '@spo/config/constants';

export default function PromotionPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <>
                <p className="title-header-success">Chúc mừng thăng hạng</p>
                <p className="title-main-content">
                    Chúc mừng bạn đã thăng hạng 
                    <span className="title-main-content-black">
                        Thành Viên Kim Cương
                    </span>
                    .
                </p>
                <div className="title-main-content-margin-top">
                    <p className="title-main-content">
                        <span className="title-main-content-red">{constants.TITLE_POPUPS.name}</span>{' '}
                        xin tặng bạn:
                    </p>
                    <p className="title-main-content title-main-content-black">
                        . 10 Điểm Bạc
                    </p>
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
