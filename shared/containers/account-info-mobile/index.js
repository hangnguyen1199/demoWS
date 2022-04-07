import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthActions from '../../../redux/auth/action';
import MasterActions from '../../../redux/master/action';
import ButtonRipple from '@spo/components/common/button-ripple';
import AppActions from '@spo/redux/app/action';
import IconChevronRight from '@spo/components/common/icon-chevron-right';
import Utils from '../../utils/utils';
import ProgressBar from '@atlaskit/progress-bar';
import useCustomRoute from '@spo/lib/use-custom-route';
import Tooltip from '@material-ui/core/Tooltip';
import IconChevronDown from '../../components/common/icons/icon-chevron-down';
import IconLocation from '../../components/common/icons/icon-location';
import constants from '../../config/constants';
import actions from './../../../redux/user-logged/action';
import AppConfig from './../../config/AppConfig';
import InputUpload from './../account-info/components/input-upload-file';
import PageList from '../../config/PageList';
import Link from 'next/link';
import ButtonMain from '../../components/common/button-main';

const AccountInfoMobileContainer = (props) => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.Auth.data.User);
    const rankConfig = useSelector((state) => state.Common.data.listRankConfig);
    const {
        data: { settingMaster },
    } = useSelector((state) => state.Common)
    const [isLogin, setIsLogin] = useState(false);
    const [isShowFlow, setIsShowFlow] = useState(false);
    const isLogged = Utils.isLogged();
    useEffect(() => {
        if (isLogged) {
            dispatch({ type: AuthActions.GET_USER_PROFILE });
        }
        setIsLogin(isLogged);
    }, [isLogged]);
    const handleShowFlowMe = () => {
        setIsShowFlow(!isShowFlow);
    };
    const onGoSignIn = () => {
        dispatch({
            type: AppActions.CHANGE_TYPE_SIGN_IN_SIGN_UP,
            data: 0,
        });
        useCustomRoute(dispatch, PageList.SIGNIN.SERVER);
    };
    const onGoSignOut = () => {
        dispatch({
            type: AuthActions.LOGOUT,
            products: [],
        });
        dispatch({
            type: AuthActions.GET_USER_SUCCESS,
            data: {},
        });
        useCustomRoute(dispatch, '/');
    };
    const onGoSignUp = () => {
        dispatch({
            type: AppActions.CHANGE_TYPE_SIGN_IN_SIGN_UP,
            data: 1,
        });
        useCustomRoute(dispatch, PageList.SIGNIN.SERVER);
    };
    const goToOrderStatus = (index) => {
        useCustomRoute(dispatch, `${PageList.ORDER_MANAGEMENT.SERVER}/?index=${index}&page=1`);
    };

    const checkLink = (page) => {
        return settingMaster?.SocialLink && settingMaster?.SocialLink[page]
            ? ''
            : 'disabled'
    }

    function goSocialPage (page) {
        // window.open(constants.SOCIAL_MEDIA[page]);
        settingMaster?.SocialLink && window.open(settingMaster.SocialLink[page])
    }    

    const handleRedirect = (val) => {
        useCustomRoute(dispatch, val);
    };
    const onChangeFile = (e) => {
        if (AppConfig.ACCESS_TOKEN) {
            dispatch({
                type: actions.UPDATE_AVATAR,
                data: {
                    data: e,
                    user: userProfile
                }
            })
        }
    }
    return (
        <div className="account-info-mobile">
            <div className="row mx-0 d-flex align-items-center justify-content-center block-border account-info-mobile-avatar-box">
                <div className='col-4 px-0'>
                    <InputUpload avatar={userProfile?.Avatar} onChange={onChangeFile} />
                </div>
                <div className='col-8 px-0'>
                    {!isLogin ? (
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className='w-100 text-right'>
                                <ButtonMain
                                    className="btn-main"
                                    title="Đăng nhập"
                                    onClick={onGoSignIn}
                                />
                            </div>
                            <div className='w-100'>
                                <ButtonMain
                                    className="button-go-sign-up"
                                    title="Đăng ký"
                                    onClick={onGoSignUp}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <span style={{ marginTop: 20, marginBottom: 15, fontSize: 16, color: '#333333', fontWeight: 400 }}>
                                {userProfile?.DisplayName}
                            </span>
                            <ProgressBar value={userProfile?.RankPoint / rankConfig[userProfile?.RankType]?.FromPoint}
                                style={{ fontSize: 14, color: '#333333', fontWeight: 400 }} />
                            <label className="" style={{ right: '50%', position: "absolute", fontSize: 14 }}>
                                {userProfile?.RankPoint}/{rankConfig[userProfile?.RankType]?.FromPoint}
                            </label>
                        </div>
                    )}
                </div>
            </div>
            <div className='row mx-0 py-2 d-start'>
                <div className='col-12' >
                    <div className='d-flex align-items-center justify-content-between block-border account-info-mobile-cart-manage'>
						Quản lý đơn hàng
                    </div>
                </div>
            </div>
            <div className='row mx-0 account-info-mobile-progress'>
                <div className='col-4 block-border-status-right'>
                    <div className='d-center flex-column' onClick={() => goToOrderStatus(0)}>
                        <span className='status-order-number'>{userProfile?.NumberOfOrder?.New || 0}</span>
                        <span className='status-order'>Chờ xác nhận</span>
                    </div>
                </div>
                <div className='col-4 block-border-status-right'>
                    <div className='d-center flex-column' onClick={() => goToOrderStatus(1)}>
                        <span className='status-order-number'>{userProfile?.NumberOfOrder?.Confirmed || 0}</span>
                        <span className='status-order'>Đang xử lý</span>
                    </div>
                </div><div className='col-4'>
                    <div className='d-center flex-column' onClick={() => goToOrderStatus(2)}>
                        <span className='status-order-number'>{userProfile?.NumberOfOrder?.Shipping || 0}</span>
                        <span className='status-order'>Đang giao</span>
                    </div>
                </div>
            </div>
            <div className='row mx-0 account-info-mobile-progress-second-row'>
                <div className='col-4 block-border-status-right'>
                    <div className='d-center flex-column ' onClick={() => goToOrderStatus(3)}>
                        <span className='status-order-number'>{userProfile?.NumberOfOrder?.Shipped || 0}</span>
                        <span className='status-order'>Đã nhận hàng</span>
                    </div>
                </div>
                <div className='col-4 block-border-status-right'>
                    <div className='d-center flex-column ' onClick={() => goToOrderStatus(4)}>
                        <span className='status-order-number'>{userProfile?.NumberOfOrder?.Canceled || 0}</span>
                        <span className='status-order'>Đã hủy</span>
                    </div>
                </div><div className='col-4'>
                    <div className='d-center flex-column '>{/* TODO */}
                        <span className='status-order-number'>{userProfile?.NumberOfOrder?.Refunded || 0}</span>
                        <span className='status-order'>Trả hàng</span>
                    </div>
                </div>
            </div>
            <div className='row mx-0 d-flex justify-content-between account-info-other-info'>
                <div className='d-flex flex-column align-items-center disabled'>
                    <img src="/images/icon/gift-hot-cate.svg" style={{ width: 25 }}></img>
                    <span style={{ marginTop: 5 }}>Nhận quà</span>
                </div>
                <div
                    className='d-flex flex-column align-items-center'
                    onClick={() => handleRedirect(PageList.WALLET.SERVER)}
                >
                    <img src="/images/icon-mobile/ic_wallet.svg" style={{ width: 25 }}></img>
                    <span style={{ marginTop: 5 }}>Ví FM</span>
                </div>
                <div
                    className='d-flex flex-column align-items-center'
                    onClick={() => handleRedirect(PageList.BRANCH_LIST.SERVER)}
                >
                    <IconLocation fontSize={25} />
                    <span style={{ marginTop: 5 }}>Cửa hàng</span>
                </div>
                <div
                    className='d-flex flex-column align-items-center'
                    onClick={() => handleRedirect(PageList.RECRUITMENT.SERVER)}
                >
                    <img src="/images/icon/recruitment-hot-cate.svg" style={{ width: 25 }}></img>
                    <span style={{ marginTop: 5 }}>Tuyển dụng</span>
                </div>
            </div>
            <div className='row mx-0 account-info-mobile-contact' >
                <div className='col-12'>
                    <Link href={{
                        pathname: PageList.WISHLIST.SERVER
                    }}>
                        <a className='d-flex align-items-center justify-content-between block-border' style={{ padding: '7px 5px' }}>
                            <div className='d-center'>
                                <img style={{ width: 17, marginRight: 10 }} src="/images/icon-mobile/ic_heart.svg" />
                                <span className='menu-text'>Đã thích</span>
                            </div>
                            <div>
                                <IconChevronRight fontSize={16} />
                            </div>
                        </a>
                    </Link>
                </div>
                <div className='col-12'>
                    <Link href={{
                        pathname: PageList.WATCHED.SERVER
                    }}>
                        <a className='d-flex align-items-center justify-content-between block-border' style={{ padding: '7px 5px' }}>
                            <div className='d-center'>
                                <img style={{ width: 17, marginRight: 10 }} src="/images/icon-mobile/ic_check.svg" />
                                <span className='menu-text'>Đã xem gần đây</span>
                            </div>
                            <div>
                                <IconChevronRight fontSize={16} />
                            </div>
                        </a>
                    </Link>
                </div>
                <div className='col-12'>
                    <Link href={{
                        pathname: PageList.MY_REVIEWS.SERVER
                    }}>
                        <a className='d-flex align-items-center justify-content-between block-border' style={{ padding: '7px 5px' }}>
                            <div className='d-center'>
                                <img style={{ width: 17, marginRight: 10 }} src="/images/icon-mobile/ic_rate.svg" />
                                <span className='menu-text'>Đánh giá của tôi</span>
                            </div>
                            <div>
                                <IconChevronRight fontSize={16} />
                            </div>
                        </a>
                    </Link>

                </div>
                {/* <div className='col-12'>
                    <div className='d-flex align-items-center justify-content-between block-border' style={{ padding: '7px 5px' }}>
                        <div className='d-center'>
                            <img style={{ width: 17, marginRight: 10 }} src="/images/icon-mobile/ic_vote.svg" />
                            <span className='menu-text'>Đánh giá của FM plus</span>
                        </div>
                        <div>
                            <IconChevronRight fontSize={16} />
                        </div>
                    </div>
                </div> */}
                <div className='col-12'>
                    <div onClick={handleShowFlowMe} className='d-flex align-items-center justify-content-between block-border' style={{ padding: '7px 5px' }}>
                        <div className='d-center'>
                            <img style={{ width: 17, marginRight: 10 }} src="/images/icon-mobile/ic_follow_us.svg" />
                            <span className='menu-text'>Theo dõi chúng tôi</span>
                        </div>
                        <div>
                            {!isShowFlow ? (<IconChevronRight fontSize={16} />) : (
                                <IconChevronDown fontSize={16} />
                            )}
                        </div>
                    </div>
                    {isShowFlow && (
                        <div>
                            <div className="d-flex justify-content-center align-items-center" style={{'marginTop': 10}}>
                                <div className='d-flex justify-content-center align-items-center flex-wrap'>
                                    <Tooltip
                                        arrow
                                        title="Facebook"
                                        placement="top">
                                        <img
                                            className={`pointer ${checkLink('LinkFacebook')}`}
                                            onClick={() => goSocialPage('LinkFacebook')}
                                            src="/images/footer/facebook_link_black.svg"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                // marginRight: 15,
                                                margin: 7.5,
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip
                                        arrow
                                        title="Instagram"
                                        placement="top">
                                        <img
                                            className={`pointer ${checkLink('LinkInstagram')}`}
                                            onClick={() => goSocialPage('LinkInstagram')}
                                            src="/images/footer/instagram_link_black.svg"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                // marginRight: 15,
                                                margin: 7.5,                                                
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </Tooltip>
                                    {/* <Tooltip
                                        arrow
                                        title="Google"
                                        placement="top">
                                        <img
                                            className="pointer"
                                            src="/images/footer/google_link_black.svg"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                marginRight: 15,
                                                // opacity: 0.5,
                                                cursor: "not-allowed"
                                            }}
                                        />
                                    </Tooltip> */}
                                    <Tooltip
                                        arrow
                                        title="Zalo"
                                        placement="top">
                                        <img
                                            className={`pointer ${checkLink('LinkZalo')}`}
                                            onClick={()=> goSocialPage('LinkZalo')}
                                            src="/images/footer/zalo_link_black.svg"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                // marginRight: 15,
                                                margin: 7.5,
                                                borderRadius: '50%',
                                                // opacity: 0.5,
                                                // cursor: "not-allowed",
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip
                                        arrow
                                        title="TikTok"
                                        placement="top">
                                        <img
                                            className={`pointer ${checkLink('LinkTiktok')}`}
                                            onClick={()=> goSocialPage('LinkTiktok')}
                                            src="/images/footer/tiktok_link_black.svg"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                // marginRight: 15,
                                                margin: 7.5,
                                                borderRadius: '50%',
                                                // opacity: 0.5,
                                                // cursor: "not-allowed"
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip
                                        arrow
                                        title="Shopee"
                                        placement="top">
                                        <img
                                            className={`pointer ${checkLink('LinkShoppe')}`}
                                            onClick={() => goSocialPage('LinkShoppe')}
                                            src="/images/footer/shopee_link_black.svg"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                // marginRight: 15,
                                                margin: 7.5,
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip
                                        arrow
                                        title="Lazada"
                                        placement="top">
                                        <img
                                            className={`pointer ${checkLink('LinkLazada')}`}
                                            onClick={() => goSocialPage('LinkLazada')}
                                            src="/images/footer/lazada_link_black.svg"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                // marginRight: 15,
                                                margin: 7.5,
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                                {/* <div
                                    style={{
                                        display: 'flex',
                                        width: 220,
                                        paddingBottom: 10,
                                        paddingLeft: 15,
                                        borderRadius: '50%',
                                    }}>
                                    <Tooltip
                                        arrow
                                        title="Twitter"
                                        placement="top">
                                        <img
                                            className="pointer"
                                            src="/images/footer/twitter_link_black.svg"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                marginRight: 15,
                                                // opacity: 0.5,
                                                cursor: "not-allowed"
                                            }}
                                        />
                                    </Tooltip>
                                    
                                    <Tooltip
                                        arrow
                                        title="Tiki"
                                        placement="top">
                                        <img
                                            className="pointer"
                                            onClick={() => goSocialPage('tiki')}
                                            src="/images/footer/tiki_link_black.svg"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                marginRight: 15,
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip
                                        arrow
                                        title="Sendo"
                                        placement="top">
                                        <img
                                            className="pointer"
                                            src="/images/footer/sendo_link_black.svg"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                marginRight: 15,
                                                // opacity: 0.5,
                                                cursor: "not-allowed"
                                            }}
                                        />
                                    </Tooltip>
                                </div> */}
                            </div>
                        </div>
                    )}

                </div>
                <div className='col-12'>
                    <div className='d-flex align-items-center justify-content-between block-border' style={{ padding: '7px 5px' }}>
                        <div className='d-center'>
                            <img style={{ width: 17, marginRight: 10 }} src="/images/icon-mobile/ic_share.svg" />
                            <span className='menu-text'>Giới thiệu bạn bè, nhận thêm thưởng</span>
                        </div>
                        <div>
                            <IconChevronRight fontSize={16} />
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <Link href={{
                        pathname: PageList.INTRODUCE.SERVER
                    }}>
                        <div className='d-flex align-items-center justify-content-between ' style={{ padding: '7px 5px' }}>
                            <div className='d-center'>
                                <img style={{ width: 17, marginRight: 10 }} src="/images/icon-mobile/ic_about.svg" />
                                <span className='menu-text'>Về chúng tôi</span>
                            </div>
                            <div>
                                <IconChevronRight fontSize={16} />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            {isLogged && (
                <div className='row mx-0' >
                    <div className='col-12'>
                        <Link href={{
                            pathname: PageList.ACCOUNT_INFO.SERVER
                        }}>
                            <a className='d-flex align-items-center justify-content-between block-border' style={{ padding: '7px 5px' }}>
                                <div className='d-center'>
                                    <img style={{ width: 17, marginRight: 10 }} src="/images/icon-mobile/ic_avatar.svg" />
                                    <span className='menu-text'>Thông tin cá nhân</span>
                                </div>
                                <div>
                                    <IconChevronRight fontSize={16} />
                                </div>
                            </a>
                        </Link>
                    </div>
                    {/* <div className='col-12'>
                    <div className='d-flex align-items-center justify-content-between block-border' style={{ padding: '7px 5px' }}>
                        <div className='d-center'>
                            <img style={{ width: 17, marginRight: 10 }} src="/images/icon-mobile/ic_settings.svg" />
                            <span className='menu-text'>Cài đặt</span>
                        </div>
                        <div>
                            <IconChevronRight fontSize={16} />
                        </div>
                    </div>
                </div> */}
                    <div className='col-12'>
                        <div onClick={onGoSignOut} className='d-flex align-items-center justify-content-between' style={{ padding: '7px 5px' }}>
                            <div className='d-center'>
                                <img style={{ width: 17, marginRight: 10 }} src="/images/icon-mobile/ic_logout.svg" />
                                <span className='menu-text'>Đăng xuất</span>
                            </div>
                            <div>
                                <IconChevronRight fontSize={16} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountInfoMobileContainer;
