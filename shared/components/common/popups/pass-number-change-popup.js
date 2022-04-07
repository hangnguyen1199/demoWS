import React from 'react';
import IconCrash from './../icon-crash';
import ComponentPopupsType from './component/component-popups-type';

export default function PassNumberChangePopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <>
                <p className="title-main-content title-main-content-center">
                    Bạn đã thay đổi quá số lần quy định trong ngày.
                </p>
                <p
                    className="title-main-content title-main-content-center"
                    style={{ marginTop: '8px' }}>
                    Vui lòng thử lại vào ngày mai.
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
