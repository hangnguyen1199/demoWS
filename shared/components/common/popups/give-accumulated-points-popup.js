import React from 'react';
import IconBuyGoldPoints from '../icon-buy-gold-points';
import ComponentPopupsType from './component/component-popups-type';

export default function GiveAccumulatedPointsPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <>
                <p
                    style={{ textAlign: 'center' }}
                    className="title-main-content">
                    Bạn tặng{' '}
                    <span className="title-main-content-black">
                        100 Điểm Tích Luỹ Vàng
                    </span>{' '}
                    cho tài <br />
                    khoản{' '}
                    <span className="title-main-content-black">
                        250521010108
                    </span>
                </p>
            </>
        );
    };
    const ContentHeader = () => {
        return <IconBuyGoldPoints />;
    };
    return (
        <ComponentPopupsType
            payload={payload}
            showVisible={showVisible}
            icon={<ContentHeader />}
            content={<Content {...props} />}
            titleButton="Xác nhận"
            showButtonCancel={true}
        />
    );
}
