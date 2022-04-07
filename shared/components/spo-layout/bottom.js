import React from 'react';
import Image from './../common/image';

/**
 * ****************************************************************************
 * DUNGNT Bottom CODE
 * bottom.js
 *
 * description		:
 * created at		:	2021-03-17
 * created by		:	DungNT
 * package			:	spo\shared\components\spo-layout\bottom.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
const Bottom = (props) => {
    return (
        <div className="footer-bottom d-flex flex-wrap">
            <div className="d-flex w-100 justify-content-between align-items-center" style={{height: 70}}>
                <div className="text-center text-md-left fontsize14">
                    {/* Đã đăng ký bản quyền URL: fm.com.vn */}
                    @ Bản quyền thuộc về <a style={{ color: '#FEE378' }} href='https://www.fm.com.vn' target='_blank' rel="noreferrer">fm.com.vn</a> All right reserved
                </div>
                <div
                    className="d-start px-0 ft-logo-right">
                    <div
                        className=""
                        style={{ paddingRight: 15 }}>
                        <a href='http://online.gov.vn/Home/WebDetails/88223' target="_blank" rel="noreferrer">
                            <Image
                                style={{
                                    width: 135,
                                    height: 'auto',
                                }}
                                src="/images/footer/bct.png"
                            />
                        </a>
                    </div>
                    <div className='d-center h-100'>
                        <span>
                            <Image
                                style={{
                                    width: 80,
                                    height: 'auto',
                                }}
                                src="/images/footer/dmca.png"
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bottom;
