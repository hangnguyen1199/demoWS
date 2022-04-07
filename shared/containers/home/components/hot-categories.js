const Image = dynamic(() => import('@spo/components/common/image'), {
    ssr: false,
});
import { Router } from '@spo/routes';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCustomRoute } from './../../../library/use-custom-route';
import Display from '@spo/components/common/display';
import IconGame from './../../../components/common/icons/icon-game';
import IconChallenge from './../../../components/common/icons/icon-challenge';
import IconGift from './../../../components/common/icons/icon-gift';
import IconTruck from './../../../components/common/icons/icon-truck';
import IconRecruit from './../../../components/common/icons/icon-recruit';
import IconLocation from '../../../components/common/icons/icon-location';
import IconHelpCenter from '../../../components/common/icons/icon-help-center';
import EventRegister, {
    EVENT_SHOW_POPUP,
    DAILY_REWARD_POPUP,
} from "../../../utils/EventRegister";
import RewardActions from '../../../../redux/reward/action';
import AppConfig from '../../../config/AppConfig';
import PageList from '../../../config/PageList';

/**
 * ****************************************************************************
 * HaiDT hot categories CODE
 * hot-categories.js
 *
 * description		:
 * updated at		:	2021-11-10
 * updated by		:	HaiDT
 * package			:	spo\shared\containers\home\components\hot-categories.js
 * copyright			:	Copyright (c) HaiDT
 * version			:	1.0.0
 * ****************************************************************************
 */
const HotCategories = (props) => {
    const dispatch = useDispatch();
    const handleRedirect = (val) => {
        useCustomRoute(dispatch, val);
    };

    const handleShowPopupDailyReward = () => {

        if (AppConfig.ACCESS_TOKEN) {
            dispatch({
                type: RewardActions.LOAD_REWARD_LIST,
                callback: () => {
                    EventRegister.emit(EVENT_SHOW_POPUP, {
                        type: DAILY_REWARD_POPUP,
                        open: true,
                        payload: {
                            className: "",
                            title: "Nhận thưởng",
                            callback: () => {},
                        },
                    });
                }
            });
        } else {
            useCustomRoute(dispatch, PageList.SIGNIN.SERVER);
        }
    }

    return (
        <div
            className="col-12 col-lg-12 px-0"
            style={{ paddingTop: 30, paddingBottom: 30 }}>
            <Display>
                <div className="w-100 pd-lr-common">
                    <div className="hot-categories">
                        <div className="d-flex text-center hot-categories-item hover-color-svg disabled">
                            <div style={{ height: 62 }}>
                                <Image seo="fm.com.vn" src={`/images/icon/game-hot-cate.svg`} />
                            </div>
                            <div>Game</div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg disabled">
                            <div style={{ height: 62 }}>
                                <Image
                                    seo="fm.com.vn"
                                    src={`/images/icon/challenges-hot-cate.svg`}
                                />
                            </div>
                            <div>Thử Thách</div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg disabled">
                            <div style={{ height: 62 }}
                                onClick={() => handleShowPopupDailyReward()}
                            >
                                <Image seo="fm.com.vn" src={`/images/icon/gift-hot-cate.svg`} />
                            </div>
                            <div>Nhận quà</div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg disabled">
                            <div style={{ height: 62 }}>
                                <Image
                                    seo="fm.com.vn"
                                    src={`/images/icon/freeship-hot-cate.svg`}
                                />
                            </div>
                            <div>
                                Miễn Phí <br></br> Vận Chuyển
                            </div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg">
                            <div
                                style={{ height: 62 }}
                                onClick={() => handleRedirect('recruitment')}>
                                <Image
                                    seo="fm.com.vn"
                                    src={`/images/icon/recruitment-hot-cate.svg`}
                                />
                            </div>
                            <div onClick={() => handleRedirect('recruitment')}>Tuyển dụng</div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg">
                            <div
                                style={{ height: 62 }}
                                onClick={() => handleRedirect('branch-list')}>
                                <IconLocation fontSize={50} />
                            </div>
                            <div onClick={() => handleRedirect('branch-list')}>Hệ thống <br></br> cửa hàng</div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg">
                            <div
                                style={{ height: 62 }}
                                onClick={() => handleRedirect('contact')}>
                                <IconHelpCenter fontSize={50} />
                            </div>
                            <div onClick={() => handleRedirect('contact')}>Trung tâm <br></br> trợ giúp</div>
                        </div>
                    </div>
                </div>
            </Display>

            <Display mobile={true}>
                <div className="w-100">
                    <div className="hot-categories">
                        <div className="d-flex text-center hot-categories-item hover-color-svg col-3 col-md disabled">
                            <div style={{ height: 43 }}>
                                <IconGame fontSize={35} />
                            </div>
                            <div>Game</div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg col-3 col-md disabled">
                            <div style={{ height: 43 }}>
                                <IconChallenge fontSize={35} />
                            </div>
                            <div>Thử Thách</div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg col-3 col-md disabled">
                            <div style={{ height: 43 }}
                                onClick={() => handleShowPopupDailyReward()}
                            >
                                <IconGift fontSize={35} />
                            </div>
                            <div>Nhận quà</div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg col-3 col-md disabled">
                            <div style={{ height: 43 }}>
                                <IconTruck fontSize={50} />
                            </div>
                            <div>
                                Miễn Phí <br></br> Vận Chuyển
                            </div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg col-3 col-md">
                            <div
                                style={{ height: 43 }}
                                onClick={() => handleRedirect('recruitment')}>
                                <IconRecruit fontSize={35} />
                            </div>
                            <div onClick={() => handleRedirect('recruitment')}>Tuyển dụng</div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg col-3 col-md">
                            <div
                                style={{ height: 43 }}
                                onClick={() => handleRedirect('branch-list')}>
                                <IconLocation fontSize={35} />
                            </div>
                            <div onClick={() => handleRedirect('branch-list')}>Hệ thống <br></br> cửa hàng</div>
                        </div>
                        <div className="d-flex text-center hot-categories-item hover-color-svg col-3 col-md">
                            <div
                                style={{ height: 43 }}
                                onClick={() => handleRedirect('contact')}>
                                <IconHelpCenter fontSize={35} />
                            </div>
                            <div onClick={() => handleRedirect('contact')}>Trung tâm <br></br> trợ giúp</div>
                        </div>
                    </div>
                </div>
            </Display>
        </div>
    );
};

export default HotCategories;
