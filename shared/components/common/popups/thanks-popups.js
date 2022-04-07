import React from 'react';
import ImagesCongratulation from '../../../../public/images/icon/icon_success.png';
import IconX from '../icon-x';
import IconHeartMin from '../icon-heart-min';
import IconMailThanks from '../icon-mail-thanks';
import ButtonPopup from '../button-popup';
import ComponentPopupsType from './component/component-popups-type';
import  constants  from '@spo/config/constants';

export default function ThanksPopups(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <div className="title-main-content-margin-top">
                <p className="title-main-content title-main-content-center">
                    <span className="title-main-content-red">
                        {constants.TITLE_POPUPS.name}
                    </span>{' '}
                    cảm ơn & ghi nhận góp ý của bạn.
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    className="title-main-content-center">
                    <p
                        className="title-main-content title-main-content-center"
                        style={{ marginRight: '10px' }}>
                        Hãy luôn ủng hộ{' '}
                        <span className="title-main-content-red">
                            {constants.TITLE_POPUPS.name}
                        </span>{' '}
                        bạn nhé
                    </p>
                    <IconHeartMin />
                </div>
            </div>
        );
    };
    return (
        <ComponentPopupsType
            content={<Content {...props} />}
            icon={<IconMailThanks />}
            payload={payload}
            showVisible={showVisible}
        />
    );
}
