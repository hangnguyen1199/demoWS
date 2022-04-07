import React from 'react';
import CustomFrame from '../../../../components/common/custom-frame';

export default function NewLoader() {
    return (
        <div className="section w-100 ">
            <div className="list-new-group">
                {/* <div className="placeholder-content">
                    <div className="placeholder-content_item"></div>
                </div> */}
                <CustomFrame ratio={346 / 1802}>
                    <div className="w-100 h-100">
                        <div className="placeholder-content">
                            <div className="placeholder-content_item"></div>
                        </div>
                    </div>
                </CustomFrame>
                <div className="mt-3 row px-0">
                    <div className="col-4">
                        <CustomFrame ratio={416 / 582}>
                            <div className="placeholder-content">
                                <div className="placeholder-content_item"></div>
                            </div>
                        </CustomFrame>
                    </div>
                    <div className="col-4">
                        <CustomFrame ratio={416 / 582}>
                            <div className="placeholder-content">
                                <div className="placeholder-content_item"></div>
                            </div>
                        </CustomFrame>
                    </div>
                    <div className="col-4">
                        <CustomFrame ratio={416 / 582}>
                            <div className="placeholder-content">
                                <div className="placeholder-content_item"></div>
                            </div>
                        </CustomFrame>
                    </div>
                </div>
            </div>
        </div>
    );
}
