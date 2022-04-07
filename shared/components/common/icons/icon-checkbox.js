import React from 'react';

function IconCheckbox(props) {
    return (
        <div className="icon-checkbox d-center">
            <svg
                style={{ fontSize: props.fontSize ?? 15 }}
                id="Group_8984"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 15 15">
                <g
                    id="Rectangle_2685"
                    fill="none"
                    stroke="#707070"
                    strokeWidth="0.5">
                    <rect width="15" height="15" stroke="none" />
                    <rect
                        x="0.25"
                        y="0.25"
                        width="14.5"
                        height="14.5"
                        fill="none"
                    />
                </g>
                <path
                    id="Icon_material-check"
                    d="M8.333,14.475l-2.4-2.4-.817.812L8.333,16.1,15.241,9.2l-.812-.812Z"
                    transform="translate(-2.678 -4.745)"
                    fill="#fff"
                />
            </svg>
        </div>
    );
}
export default IconCheckbox;
