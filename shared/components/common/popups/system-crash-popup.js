import React from 'react';
import IconCrash from './../icon-crash';
import ComponentPopupsType from './component/component-popups-type';

export default function SystemCrashPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <>
                <p className="title-main-content title-main-content-center">
                    Hệ thống xảy ra sự cố. Chúng tôi xin lỗi vì sự bất tiện này!
                </p>
                <p
                    className="title-main-content title-main-content-center"
                    style={{ marginTop: '8px' }}>
                    Quý khách vui lòng thử lại sau ít phút nữa.
                </p>
            </>
        );
    };
    return (
        <ComponentPopupsType
            payload={payload}
            showVisible={showVisible}
            content={<Content {...props} />}
            icon={<IconCrash />}
        />
    );
}
