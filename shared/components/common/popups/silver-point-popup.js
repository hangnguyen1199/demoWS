import React from 'react';
import IconPromoCode from './../icon-promo-code';
import IconSilverPoint from './../icon-silver-point';
import ComponentPopupsType from './component/component-popups-type';

export default function SilverPointPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <p
                className="title-main-content title-main-content-center"
                style={{ color: 'black' }}>
                Điểm Bạc của bạn còn 30 ngày sử dụng
            </p>
        );
    };
    return (
        <ComponentPopupsType
            payload={payload}
            showVisible={showVisible}
            content={<Content {...props} />}
            icon={<IconSilverPoint />}
        />
    );
}
