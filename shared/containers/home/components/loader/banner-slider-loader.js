import React from 'react';
import CustomFrame from '../../../../components/common/custom-frame';
import Display from '../../../../components/common/display';

export default function BannerLoader(props) {
    return (
        <>
            <CustomFrame ratio={757 / 1914}>
                <div className="banner-silder-loader w-100 h-100">
                    <div className="w-100 h-100">
                        <div className="placeholder-content">
                            <div className="placeholder-content_item"></div>
                        </div>
                    </div>
                </div>
            </CustomFrame>
        </>
    );
}
