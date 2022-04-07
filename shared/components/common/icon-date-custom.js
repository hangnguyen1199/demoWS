import React from 'react';

export default function IconDateCustom (props) {
    return (
        <div className="d-center" style={{ fontSize: props.fontSize ?? 20 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 25 28">
                <path id="Icon_material-date-range" data-name="Icon material-date-range" d="M12.833,15.6H10.056v2.8h2.778Zm5.556,0H15.611v2.8h2.778Zm5.556,0H21.167v2.8h2.778Zm2.778-9.8H25.333V3H22.556V5.8H11.444V3H8.667V5.8H7.278A2.776,2.776,0,0,0,4.514,8.6L4.5,28.2A2.788,2.788,0,0,0,7.278,31H26.722A2.8,2.8,0,0,0,29.5,28.2V8.6A2.8,2.8,0,0,0,26.722,5.8Zm0,22.4H7.278V12.8H26.722Z" transform="translate(-4.5 -3)" fill="#707070"/>
            </svg>
        </div>

    );
}
