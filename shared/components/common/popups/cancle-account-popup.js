import React from 'react';
import ComponentPopupsType from './component/component-popups-type';

export default function CancelAccountPopup(props) {
    const { payload, showVisible } = props;
    const Content = () => {
        return (
            <>
                <div>
                    <p
                        className="title-main-content"
                        style={{ textAlign: 'center' }}>
                        Khi huỷ tài khoản thì toàn bộ ưu đãi của Quý <br />{' '}
                        khách sẽ bị mất
                    </p>
                </div>
            </>
        );
    };
    const ContentHeader = () => {
        return <p className="title-name-logo-center">Huỷ tài khoản</p>;
    };
    return (
        <ComponentPopupsType
            payload={payload}
            showVisible={showVisible}
            icon={<ContentHeader />}
            content={<Content />}
            titleButton="Tiếp tục"
            showButtonCancel={true}
        />
    );
}
