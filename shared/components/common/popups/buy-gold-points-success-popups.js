import React from 'react';
import IconBuyGoldPoints from '../icon-buy-gold-points';
import ComponentPopupsType from './component/component-popups-type';
import Constants from '@spo/config/constants';

export default function BuyGoldPointsSuccessPopups(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <>
                <p className="title-header-success">
                    Giao dịch điểm vàng thành công
                </p>
                <p className="title-main-content-center ">
                    <span className="title-main-content-red">
                        {Constants.TITLE_POPUPS.name}{' '}
                    </span>{' '}
                    đã chuyển thành cộng{' '}
                    <span className="title-main-content-black">
                        10 Điểm Vàng
                    </span>{' '}
                    vào Ví <span className="title-main-content-black">FM</span>
                </p>
            </>
        );
    };
    return (
        <ComponentPopupsType
            payload={payload}
            showVisible={showVisible}
            content={<Content {...props} />}
            icon={<IconBuyGoldPoints />}
        />
    );
}
