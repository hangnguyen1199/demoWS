import React from 'react';

export function LoaderBlock (props) {
    const { loading } = props
    return (
        <div className={`_loader_overlay ${loading ? "active" : ""}`}>
            <div className="d-center w-100 h-100">
                <div className="loading">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            </div>

        </div>
    )
}
export default LoaderBlock;