const Bottom = dynamic(() => import('@spo/components/spo-layout/bottom'), {
    ssr: false,
})
import constants from '@spo/config/constants'
import useAlert from '@spo/lib/use-alert'
import useCustomRoute from '@spo/lib/use-custom-route'
import AppActions from '@spo/redux/app/action'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { PropTypes } from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import { POPUP_ERROR_TYPE } from '../../../shared/utils/EventRegister'
import { Field, reduxForm } from 'redux-form'
import RenderInput from '@spo/components/redux-form/common/footer/render-input-email'
import Image from '../common/image'
import Link from 'next/link'
import PageList from '../../config/PageList'
import ButtonMain from '../common/button-main'
import EmailActions from '../../../redux/register-email/action'
import Utils from '../../utils/utils'
import * as Validator from "@spo/lib/validator";

/**
 * ****************************************************************************
 * HAIDT Footer CODE
 * footer.js
 *
 * description		:
 * created at		:	2021-11-11
 * created by		:	HAIDT
 * package			:	spo\shared\components\spo-layout\footer.js
 * copyright			:	Copyright (c) HAIDT
 * version			:	1.0.0
 * ****************************************************************************
 */
function Footer(props) {
    const { handleSubmit, email } = props
    const dispatch = useDispatch()
    const router = useRouter()
    const [disable, setdisableButton] = useState(false);
    const {
        data: { settingMaster },
    } = useSelector((state) => state.Common)
    function goSocialPage(page) {
        // window.open(constants.SOCIAL_MEDIA[page]);
        settingMaster?.SocialLink && window.open(settingMaster.SocialLink[page])
    }
    const checkLink = (page) => {
        return settingMaster?.SocialLink && settingMaster?.SocialLink[page]
            ? ''
            : 'disabled'
    }
    const onClickEmail = (data) => {
        setdisableButton(true); 
        let newData = {
            Email: data.signupEmail,
        }
        if(newData.Email){
            dispatch({
                type: EmailActions.REGISTER_EMAIL,
                data: newData,
                success: () => {
                    Utils.alertPopup("???? ????ng k?? nh???n tin th??nh c??ng")
                    setdisableButton(false);
                    props.change("signupEmail","")
                    // dispatch({ type: EmailActions. });
                },
                error: () => {
                    setdisableButton(false);
                },
            })
        }else
        {
            Utils.alertPopup("B???n ch??a nh???p Email !")
        }
       
    }
    return (
        <div id="footer">
            <div className="site-footer">
                <div>
                    <div className="footer-top">
                        <div className="row mx-0">
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 contact-box footer-links px-0">
                                <div style={{ maxWidth: 500 }}>
                                    <div className="header">V??? ch??ng t??i</div>
                                    <ul
                                        className="addressFooter"
                                        style={{
                                            paddingLeft: 20,
                                            listStyle: 'disc',
                                            paddingBottom: 5,
                                        }}
                                    >
                                        <li style={{ paddingBottom: 10 }}>
                                            <Link
                                                prefetch={false}
                                                href={{
                                                    pathname:
                                                        PageList.INTRODUCE
                                                            .SERVER,
                                                }}
                                            >
                                                <a className="link-hover-red">
                                                    Gi???i thi???u
                                                </a>
                                            </Link>
                                        </li>
                                        <li style={{ paddingBottom: 10 }}>
                                            <Link
                                                prefetch={false}
                                                href={{
                                                    pathname:
                                                        PageList.CONTACT.SERVER,
                                                }}
                                            >
                                                <a className="link-hover-red">
                                                    Li??n h???
                                                </a>
                                            </Link>
                                        </li>
                                        <li style={{ paddingBottom: 10 }}>
                                            <Link
                                                prefetch={false}
                                                href={
                                                    PageList.BRANCH_LIST.SERVER
                                                }
                                            >
                                                <a className="link-hover-red">
                                                    H??? th???ng c???a h??ng
                                                </a>
                                            </Link>
                                        </li>
                                        <li style={{ paddingBottom: 10 }}>
                                            <Link
                                                href={{
                                                    pathname:
                                                        PageList.RECRUITMENT
                                                            .SERVER,
                                                }}
                                            >
                                                <a className="link-hover-red">
                                                    Tuy???n d???ng
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="header">
                                        C??ng ty th???i trang FM
                                    </div>
                                    <ul
                                        className="addressFooter"
                                        style={{
                                            paddingLeft: 20,
                                            listStyle: 'disc',
                                            paddingBottom: 15,
                                            fontSize: 14,
                                        }}
                                    >
                                        <li className="phone">
                                            <div
                                                className="addressFooter-phone"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                }}
                                            >
                                                <div style={{ width: 60 }}>
                                                    Hotline
                                                </div>
                                                <div className="px-1">:</div>
                                                <p>
                                                    <a
                                                        href={`tel:${constants.phone}`}
                                                        className="phone link-hover-red"
                                                        style={{
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {constants.phone}
                                                    </a>
                                                </p>
                                            </div>
                                        </li>
                                        <li className="address">
                                            <div
                                                className="addressFooter-address"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 60,
                                                        minWidth: 60,
                                                    }}
                                                >
                                                    Tr??? s???
                                                </div>
                                                <div className="px-1">:</div>
                                                <p>
                                                    <span
                                                        style={{
                                                            fontWeight: 400,
                                                        }}
                                                    >
                                                        48 Y??n B??i, Q. H???i Ch??u,
                                                        TP. ???? N???ng
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                        <li className="office">
                                            <div
                                                className="officeFooter-office"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        // width: 60,
                                                        minWidth: 60,
                                                    }}
                                                >
                                                    V??n ph??ng mi???n Nam
                                                </div>
                                                <div className="px-1">:</div>
                                                <p>
                                                    <span
                                                        style={{
                                                            fontWeight: 400,
                                                        }}
                                                    >
                                                       182 T??ng B???t H???, Quy Nh??n
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                        <li className="email">
                                            <div
                                                className="addressFooter-email"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <div style={{ width: 60 }}>
                                                    Email
                                                </div>
                                                <div className="px-1">:</div>
                                                <p>
                                                    <a
                                                        href={`mailto:${constants.email}?subject=Ph???n h???i v??? d???ch v???`}
                                                        style={{
                                                            fontWeight: 400,
                                                        }}
                                                        className=""
                                                    >
                                                        {constants.email}
                                                    </a>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                    {/* <a
                                        className="header link-hover-red"
                                        href="/branch-list"
                                        >
                                        H??? th???ng c???a h??ng
                                    </a> */}
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links px-0 center-help">
                                <div style={{ width: 292 }}>
                                    <div
                                        className="header"
                                        style={{ paddingBottom: 10 }}
                                    >
                                        Trung t??m tr??? gi??p
                                    </div>
                                    <ul
                                        className="footer-text"
                                        style={{ paddingLeft: 20 }}
                                    >
                                        <li>
                                            <Link
                                                prefetch={false}
                                                href={
                                                    PageList.SHOPPING_GUIDE
                                                        .SERVER
                                                }
                                            >
                                                <a className="link-hover-red">
                                                    H?????ng d???n mua h??ng
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                prefetch={false}
                                                href={
                                                    PageList.SIZE_GUIDE.SERVER
                                                }
                                            >
                                                <a className="link-hover-red">
                                                    H?????ng d???n ch???n size
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={{
                                                    pathname:
                                                        PageList.POLICY.SERVER,
                                                    query: {
                                                        p: 'chinh-sach-bao-hanh-&-doi-tra',
                                                    },
                                                }}
                                            >
                                                <a className="link-hover-red">
                                                    Ch??nh s??ch B???o h??nh & ?????i
                                                    tr???
                                                </a>
                                            </Link>
                                        </li>
                                        {/* <li>
											<Link
												href={{
													pathname: PageList.POLICY.SERVER,
													query: {
														p: 'chinh-sach-bao-hanh'
													}
												}}
											>
												<a
													className="link-hover-red"
												>
													Ch??nh s??ch b???o h??nh
												</a>
											</Link>
										</li> */}
                                        <li>
                                            <Link
                                                href={{
                                                    pathname:
                                                        PageList.POLICY.SERVER,
                                                    query: {
                                                        p: 'chinh-sach-khach-hang-thanh-vien',
                                                    },
                                                }}
                                            >
                                                <a className="link-hover-red">
                                                    Ch??nh s??ch kh??ch h??ng th??nh
                                                    vi??n
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={{
                                                    pathname:
                                                        PageList.POLICY.SERVER,
                                                    query: {
                                                        p: 'chinh-sach-van-chuyen',
                                                    },
                                                }}
                                            >
                                                <a className="link-hover-red">
                                                    Ch??nh s??ch v???n chuy???n
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={{
                                                    pathname:
                                                        PageList.POLICY.SERVER,
                                                    query: {
                                                        p: 'chinh-sach-bao-mat-&-chia-se-thong-tin',
                                                    },
                                                }}
                                            >
                                                <a className="link-hover-red">
                                                    Ch??nh s??ch b???o m???t & chia s???
                                                    th??ng tin
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={{
                                                    pathname:
                                                        PageList.POLICY.SERVER,
                                                    query: {
                                                        p: 'dieu-khoan-su-dung',
                                                    },
                                                }}
                                            >
                                                <a className="link-hover-red">
                                                    ??i???u kho???n s??? d???ng
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={{
                                                    pathname:
                                                        PageList.FAQ.SERVER,
                                                    query: {
                                                        p: 'cau-hoi-thuong-gap',
                                                    },
                                                }}
                                            >
                                                <a className="link-hover-red">
                                                    C??u h???i th?????ng g???p
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-2 col-lg-2 footer-links px-0">
                                <div style={{ width: 249, float: 'right' }}>
                                    <div className="header">
                                        T?? v???n mua h??ng:
                                    </div>
                                    <ul
                                        className="footer-text"
                                        style={{
                                            paddingBottom: 30,
                                            paddingLeft: 20,
                                        }}
                                    >
                                        <li>
                                            <a
                                                className="link-hover-red"
                                                href={`tel:090.1800.888`}
                                                style={{
                                                    fontWeight: 400,
                                                    fontSize: 16,
                                                }}
                                            >
                                                090.1800.888
                                            </a>
                                            <span
                                                style={{
                                                    fontWeight: 400,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                (B???m s??? 7)
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="header">
                                        G??p ??, khi???u n???i:
                                    </div>
                                    <ul
                                        className="footer-text"
                                        style={{ paddingLeft: 20 }}
                                    >
                                        <li>
                                            <a
                                                className="link-hover-red"
                                                href={`tel:090.1800.888`}
                                                style={{
                                                    fontWeight: 400,
                                                    fontSize: 16,
                                                }}
                                            >
                                                090.1800.888
                                            </a>
                                            <span
                                                style={{
                                                    fontWeight: 400,
                                                    paddingLeft: 4,
                                                }}
                                            >
                                                (B???m s??? 8)
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 contact-box px-0">
                                <div style={{ float: 'right' }}>
                                    <div
                                        className="header"
                                        style={{ paddingBottom: 15 }}
                                    >
                                        ????ng k?? nh???n tin t??? FM
                                    </div>
                                    <div
                                        className="d-flex w-100 form-email"
                                        style={{ marginBottom: 18 }}
                                    >
                                        <div>
                                            <Field
                                                placeholder="Nh???p ?????a ch??? email"
                                                name="signupEmail"
                                                component={RenderInput}
                                                validate={[Validator.emailFooter]}
                                            />
                                        </div>
                                        <div className="btn-email">
                                            <ButtonMain
                                                disable ={disable}
                                                onClick={handleSubmit(
                                                    onClickEmail
                                                )}
                                                className="w-100 "
                                                title="????ng k??"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="header"
                                        style={{ paddingBottom: 15 }}
                                    >
                                        Theo d??i ch??ng t??i
                                    </div>
                                    <div
                                        className="d-column"
                                        style={{ marginLeft: -7.5 }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                // width: 220,
                                                paddingBottom: 10,
                                            }}
                                        >
                                            <Tooltip
                                                arrow
                                                title="Facebook"
                                                placement="top"
                                            >
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className={`pointer ${checkLink(
                                                            'LinkFacebook'
                                                        )}`}
                                                        onClick={() =>
                                                            goSocialPage(
                                                                'LinkFacebook'
                                                            )
                                                        }
                                                        src="/images/footer/facebook_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5,
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <Tooltip
                                                arrow
                                                title="Instagram"
                                                placement="top"
                                            >
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className={`pointer ${checkLink(
                                                            'LinkInstagram'
                                                        )}`}
                                                        onClick={() =>
                                                            goSocialPage(
                                                                'LinkInstagram'
                                                            )
                                                        }
                                                        src="/images/footer/instagram_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5,
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                            {/* <Tooltip
                                                arrow
                                                title="Google"
                                                placement="top">
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className="pointer"
                                                        src="/images/footer/google_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5,
                                                            opacity: 0.7,
                                                            cursor: "not-allowed"
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip> */}
                                            <Tooltip
                                                arrow
                                                title="Zalo"
                                                placement="top"
                                            >
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className={`pointer ${checkLink(
                                                            'LinkZalo'
                                                        )}`}
                                                        onClick={() =>
                                                            goSocialPage(
                                                                'LinkZalo'
                                                            )
                                                        }
                                                        src="/images/footer/zalo_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5,
                                                            // opacity: 0.7,
                                                            // cursor: "not-allowed"
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <Tooltip
                                                arrow
                                                title="TikTok"
                                                placement="top"
                                            >
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className={`pointer ${checkLink(
                                                            'LinkTiktok'
                                                        )}`}
                                                        onClick={() =>
                                                            goSocialPage(
                                                                'LinkTiktok'
                                                            )
                                                        }
                                                        src="/images/footer/tiktok_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5,
                                                            // opacity: 0.7,
                                                            // cursor: "not-allowed"
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <Tooltip
                                                arrow
                                                title="Shopee"
                                                placement="top"
                                            >
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className={`pointer ${checkLink(
                                                            'LinkShoppe'
                                                        )}`}
                                                        onClick={() =>
                                                            goSocialPage(
                                                                'LinkShoppe'
                                                            )
                                                        }
                                                        src="/images/footer/shopee_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5,
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <Tooltip
                                                arrow
                                                title="Lazada"
                                                placement="top"
                                            >
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className={`pointer ${checkLink(
                                                            'LinkLazada'
                                                        )}`}
                                                        onClick={() =>
                                                            goSocialPage(
                                                                'LinkLazada'
                                                            )
                                                        }
                                                        src="/images/footer/lazada_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5,
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                // width: 220,
                                                // paddingBottom: 10,
                                            }}
                                        >
                                            {/* <Tooltip
                                                arrow
                                                title="Twitter"
                                                placement="top">
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className="pointer"
                                                        src="/images/footer/twitter_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5,
                                                            opacity: 0.7,
                                                            cursor: "not-allowed"
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip> */}
                                            {/* <Tooltip
                                                arrow
                                                title="Shopee"
                                                placement="top">
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className="pointer"
                                                        onClick={() => goSocialPage('shopee')}
                                                        src="/images/footer/shopee_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <Tooltip
                                                arrow
                                                title="Lazada"
                                                placement="top">
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className="pointer"
                                                        onClick={() => goSocialPage('lazada')}
                                                        src="/images/footer/lazada_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip> */}
                                            {/* <Tooltip
                                                arrow
                                                title="Tiki"
                                                placement="top">
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className="pointer"
                                                        onClick={() => goSocialPage('tiki')}
                                                        src="/images/footer/tiki_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <Tooltip
                                                arrow
                                                title="Sendo"
                                                placement="top">
                                                <div>
                                                    <Image
                                                        lazyLoad={false}
                                                        className="pointer"
                                                        src="/images/footer/sendo_link_black.svg"
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            marginRight: 7.5,
                                                            marginLeft: 7.5,
                                                            opacity: 0.7,
                                                            cursor: "not-allowed"
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip> */}
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 20,
                                                color: '#fff',
                                                paddingBottom: 5,
                                                marginLeft: 7.5,
                                            }}
                                        >
                                            <div
                                                className="header"
                                                style={{ paddingTop: 15 }}
                                            >
                                                T???i ???ng d???ng FM Plus t???i:
                                            </div>
                                        </div>
                                        <div
                                            className="d-start"
                                            style={{
                                                width: 228,
                                                height: 32,
                                                marginLeft: 7.5,
                                            }}
                                        >
                                            <div style={{ marginRight: 15 }}>
                                                <Tooltip
                                                    arrow
                                                    title="Android"
                                                    placement="top"
                                                >
                                                    <a
                                                        className="pointer"
                                                        href={
                                                            settingMaster
                                                                ?.Setting
                                                                ?.LinkReviewAndroid
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <Image
                                                            lazyLoad={false}
                                                            src="/images/footer/android_black.svg"
                                                            style={{
                                                                width: 36,
                                                                height: 36,
                                                            }}
                                                        />
                                                    </a>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip
                                                    arrow
                                                    title="IOS"
                                                    placement="top"
                                                >
                                                    <a
                                                        className="pointer"
                                                        href={
                                                            settingMaster
                                                                ?.Setting
                                                                ?.LinkReviewIOS
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <Image
                                                            lazyLoad={false}
                                                            src="/images/footer/iOS_black.svg"
                                                            style={{
                                                                width: 36,
                                                                height: 36,
                                                            }}
                                                        />
                                                    </a>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Bottom />
            </div>
        </div>
    )
}

Footer.propTypes = {
    showFooterOutfiz: PropTypes.bool,
    showFooterSupport: PropTypes.bool,
}
Footer.defaultProps = {
    showFooterOutfiz: false,
    showFooterSupport: false,
}
Footer = reduxForm({ form: 'FooterForm' })(Footer)
export default Footer
