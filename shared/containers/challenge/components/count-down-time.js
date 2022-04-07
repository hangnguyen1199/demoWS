import React from 'react'

export default function CountDownTime() {
    return (
        <div className='px-1' style={{height:19}}>
            <div className=' d-flex justify-content-start align-items-center flex-row text-dark h-100'>
                <div className='bg-hour h-100'>13</div>
                <div className='h-100'>:</div>
                <div className='bg-hour h-100'>14</div>
                <div className='h-100'>:</div>
                <div className='bg-hour h-100'>25</div>
            </div>
        </div>
    )
}
