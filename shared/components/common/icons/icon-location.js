import React from 'react';

function IconLocation(props) {
    return (
        <div className="icon-location d-center">
            <svg
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 47.928 64">
                <g id="Group_3915" transform="translate(-27.447 -3.672)">
                    <circle
                        id="Ellipse_1371"
                        cx="10.008"
                        cy="10.008"
                        r="10.008"
                        transform="translate(41.403 17.911)"
                        fill="none"
                        stroke="#707070"
                        strokeWidth="2"
                    />
                    <path
                        id="Path_4020"
                        d="M74.375,27.983a22.967,22.967,0,1,0-45.928,0c0,7.049,3.3,12.988,7.046,18.651,1.968,2.972,4.071,5.852,6.238,8.677q2.1,2.743,4.289,5.421c.5.617,4.52,6.1,4.955,5.936-.252.093,19.854-19.6,22.474-32.131A23.63,23.63,0,0,0,74.375,27.983Z"
                        transform="translate(0 0)"
                        fill="none"
                        stroke="#707070"
                        strokeWidth="2"
                    />
                </g>
            </svg>
        </div>
    );
}
export default IconLocation;
