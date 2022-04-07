const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
});

const TopMenu = dynamic(() => import('@spo/components/spo-top/top-menu'), {
    ssr: false,
});

const Display = dynamic(() => import('../common/display'), { ssr: false });
const IconMenu = dynamic(() => import('../common/icon-menu'), { ssr: false });
import constants from '@spo/config/constants';
import LanguageSwitcherActions from '@spo/redux/language-switcher/action';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppConfig from '../../config/AppConfig';
import { closeTopCart } from '../../library/helper';
import TopSearch from '../spo-top/TopSearchComponent/top-search';
import IconArrowLeft from '../common/icon-arrow-left';
import Link from 'next/link';
import { useCustomRoute } from '@spo/lib/use-custom-route';

const OrderHeader = (props) => {
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
            if (!(currentURL === '/' || matchRoute?.length > 0)) {
                setTransformY("unset");
                return;
            }
            let st = window.pageYOffset;
            if (st >= 150 && st > lastScrollTop) {
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
    const onGoHome = () =>{
        useCustomRoute(dispatch,'/')
    }
    return (
        <>
            <div className='sticky-top order_header'
                style={{
                    '--textHeaderHover': AppConfig.APP_HEADER_TEXT_COLOR_HOVER,
                    transform: transformY,
                    transition: "transform .3s"
                }}>
                <Display>
                    <div style={{ borderBottom: '2px inset' }} className='d-flex justify-content-between align-items-center'>
                        <div className="d-start menu px-0 header-wrap-menu pd-lr-common ">
                            <div

                                className={`justify-content-start d-flex h-100  align-items-center pointer`}>
                                <a className="d-block" href='/' onClick={onGoHome}>
                                    <Image
                                        title="Logo FM"
                                        seo="logo-fm"
                                        className="logo-fm-new object_fit_contain object-position-left"
                                        // src={`/images/icon/logo_fm_2.svg`}
                                        src={AppConfig.APP_LOGO}
                                    />
                                </a>
                                <div className='_textOrder'>
                                    <a>Thanh toán</a>
                                </div>
                            </div>
                            
                        </div>
                        <div className=' pd-lr-common '>
                            <Link href={{pathname: '/'}}>
                                <a className='d-center'>
                                    <span className='mr-2'>Tiếp tục mua sắm</span>
                                    <IconArrowLeft fontSize={16} />
                                </a>
                            </Link>
                        </div>
                    </div>
                </Display>
                <Display mobile={true}>
                    <div style={{ borderBottom: '2px inset' }} className='d-flex justify-content-between align-items-center'>
                        <div className="d-start menu px-0 header-wrap-menu pd-lr-common ">
                            <div

                                className={`justify-content-start d-flex h-100  align-items-center pointer`}>
                                <a className="d-block" href='/' onClick={onGoHome}>
                                    <Image
                                        title="Logo FM"
                                        seo="logo-fm"
                                        className="logo-fm-new object_fit_contain object-position-left"
                                        src={AppConfig.APP_LOGO}
                                    />
                                </a>
                                <div className='_textOrder'>
                                    <a>Thanh toán</a>
                                </div>
                            </div>
                            
                        </div>
                        <div className=' pd-lr-common '>
                            <Link href={{pathname: '/'}}>
                                <a className='d-center'>
                                    <span className='mr-2'>Tiếp tục mua sắm</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </Display>
            </div>
        </>
    );
};

export default OrderHeader;
