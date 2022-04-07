import React from 'react';
import IconPromoCode from './../icon-promo-code';
import ComponentPopupsType from './component/component-popups-type';
import  constants  from '@spo/config/constants';

export default function PurchaseCodePopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <p className="title-main-content title-main-content-center">
                <span className="title-main-content-red">{constants.TITLE_POPUPS.name} </span>
                xin tặng cho bạn 01 Mã Số Mua Hàng <br/> giảm 10% (
                <span className="title-main-content-red">123456789</span>).
            </p>
        );
    };
    return (
        <ComponentPopupsType
            payload={payload}
            showVisible={showVisible}
            content={<Content {...props} />}
            icon={<IconPromoCode />}
        />
    );
}
