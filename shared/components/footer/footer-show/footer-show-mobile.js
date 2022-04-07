import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip'
import Image from '../../common/image';
import { useSelector } from 'react-redux';
import CenterHelp from '../components/center-help';
import IntroduceShow from '../components/introduce';

function FooterMobile() {
    const {
        data: { settingMaster },
    } = useSelector((state) => state.Common);
    const checkLink = (page) => {
        return settingMaster?.SocialLink && settingMaster?.SocialLink[page]
            ? ''
            : 'disabled';
    };
    function goSocialPage(page) {
        // window.open(constants.SOCIAL_MEDIA[page]);
        settingMaster?.SocialLink && window.open(settingMaster.SocialLink[page])
    }
    return (
        <div className="footer-mobile center-help-mobile-box">
            <div className="introduce">
                <IntroduceShow/>
            </div>
            <div className="center-help">
                <CenterHelp/>
            </div>
            <div className="follow">
                <p className="footer-title">Theo dõi chúng tôi</p>
                <div className="d-column list-icon-app">
                    <div className="d-flex">
                        <Tooltip arrow title="Facebook" placement="top">
                            <div>
                                <Image
                                    lazyLoad={false}
                                    className={`pointer ${checkLink(
                                        'LinkFacebook'
                                    )}`}
                                    onClick={() => goSocialPage('LinkFacebook')}
                                    src="/images/footer/facebook_link_black.svg"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginRight: 4.5,
                                    }}
                                />
                            </div>
                        </Tooltip>
                        <Tooltip arrow title="Instagram" placement="top">
                            <div>
                                <Image
                                    lazyLoad={false}
                                    className={`pointer ${checkLink(
                                        'LinkInstagram'
                                    )}`}
                                    onClick={() =>
                                        goSocialPage('LinkInstagram')
                                    }
                                    src="/images/footer/instagram_link_black.svg"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginRight: 5.5,
                                        marginLeft: 5.5,
                                    }}
                                />
                            </div>
                        </Tooltip>
                        <Tooltip arrow title="Zalo" placement="top">
                            <div>
                                <Image
                                    lazyLoad={false}
                                    className={`pointer ${checkLink(
                                        'LinkZalo'
                                    )}`}
                                    onClick={() => goSocialPage('LinkZalo')}
                                    src="/images/footer/zalo_link_black.svg"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginRight: 5.5,
                                        marginLeft: 5.5,
                                    }}
                                />
                            </div>
                        </Tooltip>
                        <Tooltip arrow title="TikTok" placement="top">
                            <div>
                                <Image
                                    lazyLoad={false}
                                    className={`pointer ${checkLink(
                                        'LinkTiktok'
                                    )}`}
                                    onClick={() => goSocialPage('LinkTiktok')}
                                    src="/images/footer/tiktok_link_black.svg"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginRight: 5.5,
                                        marginLeft: 5.5,
                                    }}
                                />
                            </div>
                        </Tooltip>
                        <Tooltip arrow title="Shopee" placement="top">
                            <div>
                                <Image
                                    lazyLoad={false}
                                    className={`pointer ${checkLink(
                                        'LinkShoppe'
                                    )}`}
                                    onClick={() => goSocialPage('LinkShoppe')}
                                    src="/images/footer/shopee_link_black.svg"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginRight: 5.5,
                                        marginLeft: 5.5,
                                    }}
                                />
                            </div>
                        </Tooltip>
                        <Tooltip arrow title="Lazada" placement="top">
                            <div>
                                <Image
                                    lazyLoad={false}
                                    className={`pointer ${checkLink(
                                        'LinkLazada'
                                    )}`}
                                    onClick={() => goSocialPage('LinkLazada')}
                                    src="/images/footer/lazada_link_black.svg"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginRight: 5.5,
                                        marginLeft: 5.5,
                                    }}
                                />
                            </div>
                        </Tooltip>
                        <Tooltip arrow title="Messenger" placement="top">
                            <div>
                                <Image
                                    lazyLoad={false}
                                    className={`pointer`}
                                    onClick={() => {
                                        // TODO
                                        window.open("https://www.messenger.com/t/313642455434763")
                                    }}
                                    src="/images/footer/ic_messenger.svg"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginRight: 5.5,
                                        marginLeft: 5.5,
                                    }}
                                />
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="down-app">
                <p className="footer-title">Tải app FM tại:</p>
                <div className="d-start list-icon-app">
                    <div style={{ marginRight: 10 }}>
                        <Tooltip arrow title="Android" placement="top">
                            <a
                                className="pointer"
                                href={settingMaster?.Setting?.LinkReviewAndroid}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Image
                                    lazyLoad={false}
                                    src="/images/footer/android_black.svg"
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            </a>
                        </Tooltip>
                    </div>
                    <div>
                        <Tooltip arrow title="IOS" placement="top">
                            <a
                                className="pointer"
                                href={settingMaster?.Setting?.LinkReviewIOS}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Image
                                    lazyLoad={false}
                                    src="/images/footer/iOS_black.svg"
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            </a>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="title-bottom text-uppercase">
                <p className="mb-1">
                    CÔNG TY THỜI TRANG FM - 48 YÊN BÁI, P. HẢI CHÂU 1, Q. HẢI
                    CHÂU, TP. ĐÀ NẴNG
                </p>
                <div className="d-flex align-items-center">
                    <div className="img-bottom">
                        <Image className="w-100 h-100" style={{}} src="/images/footer/bct.png" />
                    </div>
                    <div className="img-bottom">
                        <Image className="w-100 h-100"  src="/images/footer/dmca.png" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FooterMobile;
