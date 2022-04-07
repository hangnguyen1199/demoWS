import React from 'react';
import IconPromoCode from './../icon-promo-code';
import ComponentPopupsType from './component/component-popups-type';

export default function PromoCodePopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <p className="title-main-content title-main-content-center">
                Mã Số Mua Hàng giảm 12% (
                <span className="title-main-content-red">123456</span>) của bạn
                còn 10 ngày sử dụng.
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
