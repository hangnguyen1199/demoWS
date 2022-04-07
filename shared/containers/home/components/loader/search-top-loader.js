import React from 'react'
import CustomFrame from '../../../../components/common/custom-frame';
import Display from '../../../../components/common/display'

export default function TopLoader(props) {
    return (
        <>
            <Display>
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xlg-2-5 px-3">
                        <CustomFrame ratio={473 / 351}>
                            <div className="w-100 h-100">
                                <div className="placeholder-content">
                                    <div className="placeholder-content_item"></div>
                                </div>
                            </div>
                        </CustomFrame>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xlg-2-5 px-3">
                        <CustomFrame ratio={473 / 351}>
                            <div className="w-100 h-100">
                                <div className="placeholder-content">
                                    <div className="placeholder-content_item"></div>
                                </div>
                            </div>
                        </CustomFrame>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xlg-2-5 px-3">
                        <CustomFrame ratio={473 / 351}>
                            <div className="w-100 h-100">
                                <div className="placeholder-content">
                                    <div className="placeholder-content_item"></div>
                                </div>
                            </div>
                        </CustomFrame>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xlg-2-5 px-3">
                        <CustomFrame ratio={473 / 351}>
                            <div className="w-100 h-100">
                                <div className="placeholder-content">
                                    <div className="placeholder-content_item"></div>
                                </div>
                            </div>
                        </CustomFrame>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xlg-2-5 px-3">
                        <CustomFrame ratio={473 / 351}>
                            <div className="w-100 h-100">
                                <div className="placeholder-content">
                                    <div className="placeholder-content_item"></div>
                                </div>
                            </div>
                        </CustomFrame>
                    </div>
                </div>
            </Display>
            <Display mobile={true}>
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-6 px-3">
                        <CustomFrame ratio={473 / 351}>
                            <div className="w-100 h-100">
                                <div className="placeholder-content">
                                    <div className="placeholder-content_item"></div>
                                </div>
                            </div>
                        </CustomFrame>
                    </div>
                    <div className="col-6 col-sm-6 col-md-6 px-3">
                        <CustomFrame ratio={473 / 351}>
                            <div className="w-100 h-100">
                                <div className="placeholder-content">
                                    <div className="placeholder-content_item"></div>
                                </div>
                            </div>
                        </CustomFrame>
                    </div>
                </div>
            </Display>
        </>
    );
}
