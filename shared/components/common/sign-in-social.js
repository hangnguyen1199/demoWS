import React, { memo, useCallback, useEffect, useState } from 'react';
import ButtonLoginFacebook from './button-login-facebook';
import ButtonLoginGoogle from './button-login-google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import { PropTypes } from 'prop-types';
import constants from '@spo/config/constants';
import AppConfig from '../../config/AppConfig';
import Router from 'next/router';
/**
 * ****************************************************************************
 * DUNGNT SignInSocial CODE
 * sign-in-social.js
 *
 * description		:
 * created at		:	2021-03-16
 * created by		:	DungNT
 * package			:	spo\shared\components\common\sign-in-social.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
function SignInSocial(props) {
    const responseFacebook = (response) => {
        props.responseFacebook(response);
    };
    const responseGoogle = (response) => {
        props.responseGoogle(response);
    };

    const loadFbLoginApi = () => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: AppConfig.AUTH_FACEBOOK_APP_ID,
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v3.1', // use version 2.1
                autoload: false
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            let js;
            let fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    };
    useEffect(() => {
        loadFbLoginApi();
    }, []);
    const checkLoginState = () => {
        window.FB.getLoginStatus((response) => {
            console.log('responsexxxs', response);
            if (response?.authResponse) {
                responseFacebook(response.authResponse);
            }
        });
    };

    const handleFBLogin = () => {
        window.FB.login(checkLoginState());
    };
    return (
        <div className="sign-in-social">
            <div className="d-flex padding-bottom-login">
                <hr className="my-auto flex-grow-1" />
                <div className="px-4" style={{ fontSize: 14, fontWeight: 400 }}>
                    HOẶC
                </div>
                <hr className="my-auto flex-grow-1" />
            </div>

            <div className="d-flex flex-wrap">
                <div className="col-12 px-0">
                    {/* <FacebookLogin
                        appId={AppConfig.AUTH_FACEBOOK_APP_ID}
                        callback={responseFacebook}
                        render={(renderProps) => (
                            <ButtonLoginFacebook
                                disabled={
                                    renderProps.isDisabled ||
                                    !renderProps.isSdkLoaded ||
                                    renderProps.isProcessing
                                }
                                text={props?.textFacebook}
                                onClick={() => {
                                    renderProps.onClick();
                                }}
                            />
                        )}
                    /> */}
                    <ButtonLoginFacebook
                        // disabled={
                        //     renderProps.isDisabled ||
                        //     !renderProps.isSdkLoaded ||
                        //     renderProps.isProcessing
                        // }
                        text={props?.textFacebook}
                        onClick={() => {
                            // renderProps.onClick();
                            handleFBLogin();
                        }}
                    />
                </div>
                <div className="col-12 px-0" style={{ marginTop: 15 }}>
                    <GoogleLogin
                        clientId={AppConfig.AUTH_GOOGLE_CLIENT_ID}
                        render={(renderProps) => (
                            <ButtonLoginGoogle
                                text={props?.textGoogle}
                                onClick={renderProps.onClick}
                            />
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={false}
                    />
                </div>
            </div>
        </div>
    );
}
SignInSocial.propTypes = {
    responseFacebook: PropTypes.func,
    responseGoogle: PropTypes.func,
};
SignInSocial.defaultProps = {
    responseFacebook: () => {
        alert('Cài đặt function responseFacebook');
    },
    responseGoogle: () => {
        alert('Cài đặt function responseGoogle');
    },
};
export default memo(SignInSocial);
