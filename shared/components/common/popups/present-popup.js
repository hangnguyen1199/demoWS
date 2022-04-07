import React from 'react';
import IconPresent from './../icon-present';
import ComponentPopupsType from './component/component-popups-type';
import  constants  from '@spo/config/constants';
// /
export default function PresentPopup(props) {
    const { payload, showVisible } = props;
    const Content = () => {
        return (
            <>
                <p className="title-header-success">Quà tặng kết nối dài lâu</p>
                <p className="title-main-content">
                    Cảm ơn bạn đồng hành cùng
                    <span className="title-main-content-black"> {constants.TITLE_POPUPS.name} </span>
                    trong thời gian qua.
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
            content={<Content />}
            icon={<IconPresent />}
        />
    );
}
