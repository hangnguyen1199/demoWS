import React from 'react';

function IconHome(props) {
    return (
        <div className="icon-bell1 d-center">
            <svg
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24.499 24.55"
            >
                <path
                    id="Path_4028"
                    data-name="Path 4028"
                    d="M28.166,14.935v12.6a.631.631,0,0,1-.639.623H19.366a.631.631,0,0,1-.639-.623v-6.3a.631.631,0,0,0-.639-.623H14.744a.631.631,0,0,0-.639.623v6.3a.631.631,0,0,1-.639.623H5.306a.631.631,0,0,1-.639-.623v-12.6h0l5.875-5.248,5.443-4.863a.651.651,0,0,1,.863,0l5.443,4.863,5.875,5.248Z"
                    transform="translate(-4.167 -4.11)"
                    fill="none"
                    stroke="#707070"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                />
            </svg>
        </div>
    );
}
export default IconHome;
