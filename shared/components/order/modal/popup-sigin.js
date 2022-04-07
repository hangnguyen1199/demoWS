import React from 'react'
import Display from '../../common/display';
import ButtonMain from './../../common/button-main';
import Router from 'next/router';
import PageList from './../../../config/PageList';

export default function PopupSignIn(props) {
    const handleOffPopup=()=>{
        $('.popup-hover-free-ship').css({"display":"none"});
    }
    const onLogin=()=>{
        Router.push(PageList.SIGNIN.SERVER)
    }
    return (
        <>
            <Display>
                <div className="popup-hover-free-ship">
                    <div className="arrow-left"></div>
                    <p className={props.className}>Vui lòng đăng nhập để sử dụng tính năng này</p>
                    <div className="w-100 d-flex justify-content-between">
                        <ButtonMain
                            className="btn-size-small cursor-pointer"
                            onClick={onLogin}
                            title="Đăng nhập"
                        />
                        <ButtonMain
                            className="btn-dark-ship btn-size-small cursor-pointer"
                            onClick={handleOffPopup}
                            title="Bỏ qua"
                        />
                    </div>
                </div>
            </Display>
        </>
    )
}
