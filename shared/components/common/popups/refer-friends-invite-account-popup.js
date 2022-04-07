import React from 'react';
import IconUserFriend from '../icon-user-friend';
import ComponentPopupsType from './component/component-popups-type';
import  constants  from '@spo/config/constants';

export default function ReferFriendsInviteAccountPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <>
                <p className="title-main-content">
                    <span className="title-main-content-black">
                        200812848390
                    </span>{' '}
                    đã chấp nhận lời mời sử dụng{' '}
                    <span className="title-main-content-red">
                        {constants.TITLE_POPUPS.name}
                    </span>{' '}
                    của bạn
                </p>
                <div className="title-main-content-margin-top">
                    <p className="title-main-content">
                        <span className="title-main-content-red">
                            {constants.TITLE_POPUPS.name}
                        </span>{' '}
                        xin tặng bạn:
                    </p>
                    <p className="title-main-content title-main-content-black">
                        . 200 Điểm Bạc
                    </p>
                    <p className="title-main-content title-main-content-black">
                        . Mã Số Mua Hàng giảm 12% (
                        <span className="title-main-content-red">
                            123456789
                        </span>
                        )
                    </p>
                </div>
                <div className="title-main-content-margin-top">
                    <p className="title-main-content">
                        Mời thêm nhiều bạn bè để nhận được thêm ưu đãi.
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
            icon={<IconUserFriend />}
        />
    );
}
