import React from 'react';
import CustomFrame from '../../../../components/common/custom-frame';
import Display from '../../../../components/common/display';

export default function PromotionLoader(props) {
    return (
        <>
            <Display>
                <div className="section w-100 ">
                    <div className="list-new-group">
                        <div className="row px-0">
                            <div className="col-12 col-lg-6">
                                <CustomFrame ratio={418 / 891}>
                                    <div className="w-100 h-100">
                                        <div className="placeholder-content">
                                            <div className="placeholder-content_item"></div>
                                        </div>
                                    </div>
                                </CustomFrame>
                            </div>
                            <div className="col-12 col-lg-6">
                                <CustomFrame ratio={418 / 891}>
                                    <div className="w-100 h-100">
                                        <div className="placeholder-content">
                                            <div className="placeholder-content_item"></div>
                                        </div>
                                    </div>
                                </CustomFrame>
                            </div>
                        </div>
                    </div>
                </div>
            </Display>
            <Display mobile={true}>
                <div className="list-new-group">
                    <div className="row px-0">
                        <div className="mt-2 col-12">
                            <CustomFrame ratio={365 / 948}>
                                <div className="w-100 h-100">
                                    <div className="placeholder-content">
                                        <div className="placeholder-content_item"></div>
                                    </div>
                                </div>
                            </CustomFrame>
                        </div>
                        <div className="mt-2 col-12">
                            <CustomFrame ratio={365 / 948}>
                                <div className="w-100 h-100">
                                    <div className="placeholder-content">
                                        <div className="placeholder-content_item"></div>
                                    </div>
                                </div>
                            </CustomFrame>
                        </div>
                    </div>
                </div>
            </Display>
        </>
    );
}
