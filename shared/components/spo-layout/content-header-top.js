import React from 'react';
import Display from './../common/display';

export default function ContentHeaderTop(props) {
    return (
        <Display>
            <div style={{ backgroundColor: '#FF2C00', height: '40px' }} className='d-flex justify-content-center align-items-center w-100'>
                <p style={{ color: '#FFF' }} className='text-content-header' >{props.text}</p>
            </div>
        </Display>
    );
}
