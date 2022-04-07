import React from 'react';

function IconWarning(props) {
    return (
        <div className="icon-warning d-center">
            <svg
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="53"
                viewBox="0 0 60 53">
                <g
                    id="exclamation-triangle-fill"
                    transform="translate(-0.001 -2.247)">
                    <path
                        id="Path_15"
                        d="M33.676,4.4a4.216,4.216,0,0,0-7.349,0L.618,48.558a4.419,4.419,0,0,0,3.674,6.689H55.707a4.418,4.418,0,0,0,3.674-6.689Zm-3.681,13a3.378,3.378,0,0,0-2.515,1.128,3.446,3.446,0,0,0-.86,2.639l1.311,13.276a2.068,2.068,0,0,0,4.124,0L33.367,21.16a3.446,3.446,0,0,0-.859-2.639A3.378,3.378,0,0,0,29.995,17.394ZM30,40.105a3.786,3.786,0,1,0,3.749,3.785A3.767,3.767,0,0,0,30,40.105Z"
                        transform="translate(0)"
                        fill="#ff2c00"
                        fillRule="evenodd"
                    />
                </g>
            </svg>
        </div>
    );
}
export default IconWarning;
