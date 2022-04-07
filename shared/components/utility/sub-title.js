import ButtonDark from '@spo/components/common/button-dark';
import ButtonRed from '@spo/components/common/button-red';
import React from 'react';
import { useDispatch } from 'react-redux';
import AppActions from '@spo/redux/app/action';
import { useCustomRoute } from './../../library/use-custom-route';
import PageList from '../../config/PageList';

export default function SubTitle(props) {
    const dispatch = useDispatch()
    const gotoLogin = () =>{
        useCustomRoute(dispatch, PageList.SIGNIN.SERVER)
    }
    const gotoSignUp = () =>{
        dispatch({
            type: AppActions.CHANGE_TYPE_SIGN_IN_SIGN_UP,
            data: 2,
        });
        useCustomRoute(dispatch, PageList.SIGNIN.SERVER);
    }
    return (
        <div
            className="w-100 bg-white d-flex flex-column justify-content-center align-items-center sub-title-content">
            <span className="text-center fontsize24 bold">{props.title}</span>
            <div className="d-center">
                <div className="none-login d-flex flex-column justify-content-center align-items-center">
                    <div className="fontsize16" style={{ paddingTop: 20, paddingBottom: 15 }}>Để sử dụng tính năng này, Quý Khách cần</div>
                    <div className="buttonSet text-center w-100" style={{ paddingTop: 15, paddingBottom: 10 }}>
                        <div style={{ height: 39 }}>
                            <ButtonDark
                                className="w-100"
                                onClick={gotoLogin}
                                fontSize={16}
                                title={
                                    'ĐĂNG NHẬP'
                                }
                            />
                        </div>
                    </div>
                    <div className="d-center" style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <span tabIndex="0" className="link-hover link-focus fontsize16">
                            Quên mã PIN
                        </span>
                    </div>
                    <div className="d-flex w-100" style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <hr className="my-auto flex-grow-1" />
                        <div className="px-4">HOẶC</div>
                        <hr className="my-auto flex-grow-1" />
                    </div>
                    <div className="buttonSet text-center w-80" style={{ paddingTop: 15, paddingBottom: 10 }}>
                        <div style={{ height: 39, width: 200 }}>
                            <ButtonRed
                                className="w-100"
                                onClick={gotoSignUp}
                                fontSize={16}
                                title={
                                    'ĐĂNG KÝ MỚI'
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
