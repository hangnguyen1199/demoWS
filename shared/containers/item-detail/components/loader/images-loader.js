import React from 'react';
import Display from '../../../../components/common/display';
import UseWindowSize from './../../../../library/use-window-size';

export default function ImagesLoader(props) {
    return (
        <>
            <Display>
                <div className="img-left-loader">
                    <div className="placeholder-content">
                        <div className="placeholder-content_item"></div>
                    </div>
                </div>
                <div className="img-left-loader">
                    <div className="placeholder-content">
                        <div className="placeholder-content_item"></div>
                    </div>
                </div>
                <div className="img-left-loader">
                    <div className="placeholder-content">
                        <div className="placeholder-content_item"></div>
                    </div>
                </div>
                <div className="img-left-loader">
                    <div className="placeholder-content">
                        <div className="placeholder-content_item"></div>
                    </div>
                </div>
                <div className="img-left-loader">
                    <div className="placeholder-content">
                        <div className="placeholder-content_item"></div>
                    </div>
                </div>
                <div className="img-left-loader">
                    <div className="placeholder-content">
                        <div className="placeholder-content_item"></div>
                    </div>
                </div>
                <div className="img-left-loader">
                    <div className="placeholder-content">
                        <div className="placeholder-content_item"></div>
                    </div>
                </div>
            </Display>
            <Display mobile={true}>
                {UseWindowSize().width > 500 ? (
                    <>
                        <div className="img-left-loader">
                            <div className="placeholder-content">
                                <div className="placeholder-content_item"></div>
                            </div>
                        </div>
                        <div className="img-left-loader">
                            <div className="placeholder-content">
                                <div className="placeholder-content_item"></div>
                            </div>
                        </div>
                        <div className="img-left-loader">
                            <div className="placeholder-content">
                                <div className="placeholder-content_item"></div>
                            </div>
                        </div>
                        <div className="img-left-loader">
                            <div className="placeholder-content">
                                <div className="placeholder-content_item"></div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="img-left-loader">
                            <div className="placeholder-content">
                                <div className="placeholder-content_item"></div>
                            </div>
                        </div>
                        <div className="img-left-loader">
                            <div className="placeholder-content">
                                <div className="placeholder-content_item"></div>
                            </div>
                        </div>
                        <div className="img-left-loader">
                            <div className="placeholder-content">
                                <div className="placeholder-content_item"></div>
                            </div>
                        </div>
                    </>
                )}
            </Display>
        </>
    );
}
