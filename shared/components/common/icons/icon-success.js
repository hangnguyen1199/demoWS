import React from 'react';

function IconSuccess(props) {
    return (
        <div className="icon-bell1 d-center">
            <svg
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 70 70">
                <path
                    id="Icon_awesome-check-circle"
                    d="M70.563,35.563a35,35,0,1,1-35-35A35,35,0,0,1,70.563,35.563ZM31.514,54.095,57.482,28.127a2.258,2.258,0,0,0,0-3.193L54.288,21.74a2.258,2.258,0,0,0-3.193,0L29.917,42.918,20.03,33.031a2.258,2.258,0,0,0-3.193,0l-3.193,3.193a2.258,2.258,0,0,0,0,3.193L28.321,54.095a2.258,2.258,0,0,0,3.193,0Z"
                    transform="translate(-0.563 -0.563)"
                    fill="#33cd13"
                />
            </svg>
        </div>
    );
}
export default IconSuccess;
