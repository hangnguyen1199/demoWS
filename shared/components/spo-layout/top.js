const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
});

const TopMenu = dynamic(() => import('@spo/components/spo-top/top-menu'), {
    ssr: false,
});

const Display = dynamic(() => import('../common/display'), { ssr: false });
const IconMenu = dynamic(() => import('./../common/icon-menu'), { ssr: false });
import LanguageSwitcherActions from '@spo/redux/language-switcher/action';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopSearch from './../spo-top/TopSearchComponent/top-search';
import Header from './header';
import AppConfig from './../../config/AppConfig';
import constants from '@spo/config/constants';
import { closeTopCart } from '../../library/helper';
import ContentHeaderTop from './content-header-top';

const Top = (props) => {
    const { user, carts, wishlist, notifications, count_unread } = props;
    const [isShowContentTop, setIsShowContentTop] = useState(false);
    const dispatch = useDispatch();
    const { lang } = useSelector((state) => state.LanguageSwitcher.lang);
    // const [appGui, setAppGui] = useState({});
    const switchLanguage = (l) => {
        if (l === 'en') {
            dispatch({
                type: LanguageSwitcherActions.SWITCH_LANGUAGE,
                locale: 'en-us',
            });
        } else {
            dispatch({
                type: LanguageSwitcherActions.SWITCH_LANGUAGE,
                locale: 'vi-vn',
            });
        }
    };
    //
    const [transformY, setTransformY] = useState("unset");
    let lastScrollTop = 0;
    useEffect(() => {
        const onScroll = () => {
            const currentURL = window.location.pathname;
            const whitelistAnimationTop = constants?.WHITELIST_ANIMATION_TOP || [];
            const matchRoute = whitelistAnimationTop.filter((e) => currentURL.startsWith(e));
            if(!(currentURL === '/' || matchRoute?.length > 0)){
                setTransformY("unset");
                return;
            }
            let st = window.pageYOffset;
            if (st >= 150 && st > lastScrollTop){
                // downscroll code
                setTransformY("translateY(-315px)");
                closeTopCart()
            } else {
                // upscroll code
                setTransformY("unset");
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        };

        window.addEventListener("scroll", onScroll, false);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <div className='sticky-top' 
                style={{
                    '--textHeaderHover':AppConfig.APP_HEADER_TEXT_COLOR_HOVER, 
                    transform: transformY, 
                    transition: "transform .3s" 
                }}>
                {isShowContentTop&&<ContentHeaderTop text={"VẬN CHUYỂN MIỄN PHÍ"} />}
                <Display mobile={true}>
                    <div
                        className={`top-header  pd-lr-common`}
                        style={{
                            // background: AppConfig.APP_HEADER_BG_COLOR,
                            // color: AppConfig.APP_HEADER_TEXT_COLOR,
                        }}>
                        <div className="w-100 h-100 ">
                            <div className=" h-100 d-flex justify-content-between">
                                <Display mobile={true}>
                                    <div className="d-flex w-100">
                                        <TopSearch />
                                    </div>
                                </Display>
                                <Display>
                                    <div
                                        className="d-start top-switch-lang"
                                        style={{ width: 160, display: "none" }}>
                                        <div
                                            className={`fonsize16 link-hover hover-color-svg ${lang == 'vi' ? 'active' : ''
                                            }`}
                                            onClick={(e) => switchLanguage('vi')}>
                                            Tiếng Việt
                                        </div>
                                        <div
                                            className={`px-3 fonsize16 link-hover hover-color-svg ${lang === 'en' ? 'active' : ''
                                            }`}
                                            onClick={(e) => switchLanguage('en')}>
                                            English
                                        </div>
                                    </div>
                                </Display>
                                <TopMenu
                                    notifications={notifications}
                                    count_unread={count_unread}
                                    user={user}
                                    carts={carts}
                                    wishlist={wishlist}
                                />
                            </div>
                        </div>
                    </div>
                </Display>
                <Header 
                    isShowContentTop={isShowContentTop}
                    notifications={notifications}
                    count_unread={count_unread}
                    user={user}
                    carts={carts}
                    wishlist={wishlist} />
            </div>
        </>
    );
};

export default Top;
