import React from 'react';

function ZaloSocial(props) {
    const { oaid, mess } = props;
    return (
        <div className="zalo-social">
            <div
                dangerouslySetInnerHTML={{
                    __html: `<div class='zalo-chat-widget' data-oaid=${oaid} data-welcome-message=${mess} data-autopopup='0' data-width='350' data-height='420'></div>`,
                }}></div>
            <script src="https://sp.zalo.me/plugins/sdk.js"></script>
        </div>
    );
}
ZaloSocial.defaultProps = {
    oaid: '6453028060033891',
    mess: 'Rất vui khi được hỗ trợ bạn!',
};
export default ZaloSocial;
