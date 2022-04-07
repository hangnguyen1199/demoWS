const RankContainer = dynamic(() => import('@spo/containers/rank'), {
    ssr: true,
});
import React from 'react'
import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';

function Rank() {
    return (
        <div>
            <RankContainer />
        </div>
    )
}

Rank.Layout = SpoLayout;
export default Rank;