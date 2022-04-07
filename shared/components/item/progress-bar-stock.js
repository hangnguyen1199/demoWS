import React from 'react';

function ProgressBarStock(props) {
    const { height, progress } = props;
    return (
        <div className="progress-bar-stock ">
            <div className="progress " style={{ height: height }}>
                <div
                    className="progress-bar background-dark d-end"
                    style={{ width: `${progress}%`, height: height }}></div>
            </div>
        </div>
    );
}
ProgressBarStock.defaultProps = {
    height: 10,
    progress:40,
};
export default ProgressBarStock;
