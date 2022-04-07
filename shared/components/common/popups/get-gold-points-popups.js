import React from 'react';
import IconSilverPoint from './../icon-silver-point';
import ComponentPopupsType from './component/component-popups-type';
import constants from '@spo/config/constants';

export default function GetGoldPointsPopups(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <>
                <p
                    className="title-main-content-center "
                    style={{ color: 'black' }}>
                    <span className="title-main-content-red">{constants.TITLE_POPUPS.name} </span>
                    xin tặng cho bạn 10 Điểm Vàng
                </p>
            </>
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
