import React from 'react';

function IconFb(props) {
    return (
        <div className="icon-bell1 d-center">
            <svg
                style={{ fontSize: props.fontSize ?? 20 }}
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="1em"
                viewBox="0 0 21 40">
                <path
                    id="Path_20669"
                    d="M65.515,82.084h7.741V64.658h5.711c.367-2.443.727-4.829,1.1-7.275H73.228c0-.53,0-1.013,0-1.5.016-1.292-.036-2.589.075-3.874a3.315,3.315,0,0,1,3.347-3.221c.616-.037,1.231-.029,1.847-.034.595-.005,1.187,0,1.821,0V42.575c-2.662-.352-5.328-.783-8.013-.214a8.148,8.148,0,0,0-6.593,7.434c-.2,1.96-.122,3.949-.163,5.925-.01.525,0,1.052,0,1.642H59.32v7.275h6.195V82.084Z"
                    transform="translate(-59.32 -42.084)"
                    fill="#0f4597"
                />
            </svg>
        </div>
    );
}
export default IconFb;
