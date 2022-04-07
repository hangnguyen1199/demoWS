const ScrollToTop = dynamic(
    () => import('@spo/components/spo-layout/scroll-to-top'),
    { ssr: false }
);

import React from 'react';
import CallButton from './call-button';
import dynamic from 'next/dynamic';
import constants from '@spo/config/constants';
import FacebookSocial from '../common/facebook-social';
import Display from '../common/display';

function FloatButtonGroup(props) {
    return (
        <>
            {/* <div className="float-button-group">
                <CallButton />
            </div> */}
            <ScrollToTop />
            <Display>
                <FacebookSocial
                    pageId={constants?.SOCIAL_MEDIA?.FB?.FB_PAGE_ID}
                    appId={constants?.SOCIAL_MEDIA?.FB?.FB_APP_ID}
                />
            </Display>
        </>
    );
}
export default FloatButtonGroup;
