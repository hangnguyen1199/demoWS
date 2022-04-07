import React from 'react';
import AddCartLoader from './add-cart-loader';
import LoaderCircle from './loader-circle';

export default function InformationLoader(props) {
    return (
        <div className="d-flex flex-column w-100 mb-2">
            <div className="w-100 loader-name-detail">
                <div className="placeholder-content">
                    <div className="placeholder-content_item"></div>
                </div>
            </div>
            <div className="loader-brand-detail mt-3">
                <div className="placeholder-content">
                    <div className="placeholder-content_item"></div>
                </div>
            </div>
            <div className="loader-price-detail mt-3">
                <div className="placeholder-content">
                    <div className="placeholder-content_item"></div>
                </div>
            </div>
            {/* <div className="loader-price-detail mt-4">
                <div className="placeholder-content">
                    <div className="placeholder-content_item"></div>
                </div>
            </div>
            <div className="w-100 mt-3">
                <div className="d-flex flex-row">
                    <LoaderCircle />
                    <LoaderCircle />
                    <LoaderCircle />
                    <LoaderCircle />
                </div>
            </div>
            <div className="w-100 mt-3">
                <AddCartLoader />
            </div> */}
        </div>
    );
}
