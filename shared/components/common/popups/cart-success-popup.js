import React from 'react';
import IconCheckGreen from './../icon-check-green';
import ComponentPopupsType from './component/component-popups-type';
// IconCheckGreen
export default function CartSuccessPopup(props) {
    const { payload, showVisible } = props;
    const Content = () => {
        return (
            <>
                <p style={{minWidth:'300px'}} className="title-main-content title-main-content-center">
                    Đã thêm vào giỏ hàng
                </p>
            </>
        );
    };
    return (
        <ComponentPopupsType
            payload={payload}
            showVisible={showVisible}
            content={<Content />}
            icon={<IconCheckGreen />}
        />
    );
}
