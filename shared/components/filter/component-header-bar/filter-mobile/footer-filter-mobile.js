import React from 'react'
import ButtonLight from '@spo/components/common/button-light';
import ButtonDark from '@spo/components/common/button-dark';
import ButtonMain from '../../../common/button-main';

export default function FooterFilterMobile(props) {
    const {
        handleSubmit,
        handleRemoveAll
    } = props;
    return (
        <>
            <div className='d-flex filter-mobile-button-item my-2'>
                <div className='d-center' style={{ width: 165, height: 37, border: "1px solid #333333", marginRight: 15, borderRadius: 4 }}>
                    <ButtonLight
                        className="w-100"
                        onClick={() => {
                            handleSubmit()
                        }}
                        title={'Áp dụng'}
                    />
                </div>
                <div style={{ width: 165, height: 39 }}>
                    <ButtonMain
                        className="w-100"
                        onClick={() => {
                            handleRemoveAll();
                        }}
                        title={'Thiết lập lại'}
                    />
                </div>
            </div>
        </>
    )
}
