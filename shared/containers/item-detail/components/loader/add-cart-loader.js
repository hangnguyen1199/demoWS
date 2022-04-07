import React from 'react';

export default function AddCartLoader(props) {
    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-between">
                <div className="col-loader-add-left">
                    <div className="placeholder-content">
                        <div className="placeholder-content_item"></div>
                    </div>
                </div>
                <div className="col-loader-add-right">
                    <div className="placeholder-content">
                        <div className="placeholder-content_item"></div>
                    </div>
                </div>
            </div>

            <div className="w-100 btn-loader-add-cart mt-3">
                <div className="placeholder-content">
                    <div className="placeholder-content_item"></div>
                </div>
            </div>
            <div className="w-100 btn-loader-add-cart mt-3">
                <div className="placeholder-content">
                    <div className="placeholder-content_item"></div>
                </div>
            </div>
        </div>
    );
}
