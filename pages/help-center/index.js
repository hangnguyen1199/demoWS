import React from 'react';
import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';

const HelpCenterContainer = dynamic(() =>
    import('@spo/containers/help-center'),
);
const HelpCenter = () => {
    return <HelpCenterContainer />;
};
HelpCenter.Layout = SpoLayout;
export default HelpCenter;
