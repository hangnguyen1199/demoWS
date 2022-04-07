import React, { useEffect } from "react";
import ResizePopup from "./resize-popup";
import { useDispatch, useSelector } from "react-redux";
import SilverCoin from "../../../../public/images/icon/wallet/silver_coin.svg";
import DailyGoldCircle from "../../../../public/images/icon/reward/daily-gold-circle.svg";
import DailySilverCircle from "../../../../public/images/icon/reward/daily-silver-circle.svg";
import RedRightArrow from "../../../../public/images/icon/reward/icon-red-right-arrow.svg";
import ArrowLeft from "../../../../public/images/icon/arrow-left.svg";
import Image from "./../image";
import ButtonRipple from "./../button-ripple";
import styles from "./css/DailyRewardPopup.module.css";
import RewardActions from "../../../../redux/reward/action";
import { useCustomRoute } from "@spo/lib/use-custom-route";
import PageList from "../../../config/PageList";

DailyRewardPopup.propTypes = {};

function DailyRewardPopup(props) {
    const dispatch = useDispatch();
    const { payload, showVisible, type } = props;
    const reward = useSelector((state) => state.Reward);
    const userProfile = useSelector((state) => state.Auth.data.User);

    const getRewardPoint = reward.List?.find(
        (item) => item.NumberOfDay === reward.NumberOfDay
    );

    const lessThanTenNumber = (number) => {
        if (number === 0) {
            return 0;
        }
        if (number >= 10) {
            return `${number}`;
        } else {
            return `0${Math.abs(number)}`;
        }
    };

    const handleOnPressReward = () => {
        dispatch({ type: RewardAction.USER_REWARD_RECEIVE });
    };

    const _renderSilverStep = (
        numberOfDay = 1,
        point = 0,
        achievedDay = 1,
        todayReceived = false
    ) => {
        return (
            <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                    <div className="position-relative">
                        <Image
                            className={`${styles.img_daily_silver_circle} ${
                                achievedDay > numberOfDay ||
                (achievedDay == numberOfDay && todayReceived)
                                    ? styles.opacity_0_7
                                    : ""
                            }`}
                            src={DailySilverCircle}
                        />
                        <span className={styles.reward_value}>{point}</span>
                    </div>
                    <Image className="" src={RedRightArrow} style={{ width: 24 }} />
                </div>
                <div
                    className={`text-center mt-2 font-weight-light ${styles.reward_date}`}
                >
                    {numberOfDay == achievedDay ? (
                        <>
                            <div>Hôm</div>
                            <div className="pt-1">nay</div>
                        </>
                    ) : (
                        <>
                            <div>Ngày</div>
                            <div className="pt-1">{numberOfDay}</div>
                        </>
                    )}
                </div>
            </div>
        );
    };

    const _renderGoldStep = (
        numberOfDay = 1,
        point = 0,
        achievedDay = 1,
        todayReceived = false
    ) => {
        return (
            <>
                <div className="d-flex flex-column">
                    <div className="position-relative">
                        <Image
                            className={`${
                                achievedDay > numberOfDay ||
                (achievedDay == numberOfDay && todayReceived)
                                    ? styles.opacity_0_7
                                    : ""
                            }`}
                            src={DailyGoldCircle}
                            style={{ width: 35 }}
                        />
                        <span className={`${styles.reward_value} ${styles.font_size_15}`}>
                            {point}
                        </span>
                    </div>
                    <div
                        className={`text-center font-weight-light ${styles.reward_gold_date}`}
                    >
                        {numberOfDay == achievedDay ? (
                            <>
                                <div>Hôm</div>
                                <div className="pt-1">nay</div>
                            </>
                        ) : (
                            <>
                                <div>Ngày</div>
                                <div className="pt-1">{numberOfDay}</div>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    };

    const _renderComponentChildren = () => {
        return (
            <div className="d-flex flex-column mx-0">
                <div className={`d-center py-3 ${styles.user_silver_coin_wrap}`}>
                    <Image className={styles.silver_coin} src={SilverCoin} />
                    <span className={styles.user_silver_coin}>
                        {userProfile.NormalPoint}
                    </span>
                    <Image
                        className="pl-2 pointer"
                        onClick={() => {
                            showVisible(false);
                            useCustomRoute(dispatch, PageList.WALLET.SERVER);
                        }}
                        src={ArrowLeft}
                        style={{ width: 17 }}
                    />
                </div>
                <div>
                    <div
                        className={`font-weight-light d-center pointer ${
                            styles.btn_achieve
                        } ${reward?.TodayReceived ? "disabled" : ""}`}

                        onClick={() => handleOnPressReward()}
                    >
                        {reward?.TodayReceived ? (
                            "Quay lại vào ngày mai để nhận Điểm Bạc"
                        ) : (
                            <>
                                <span>Nhấn để nhận ngay</span>&nbsp;
                                <span className="font-weight-normal">
                                    {lessThanTenNumber(getRewardPoint?.Point || 0)} Điểm Bạc
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div
                    className="d-flex align-items-center"
                    style={{ marginTop: "15px" }}
                >
                    {reward?.List?.length > 0 ? (
                        reward.List.map((el) => {
                            const numberOfDay = el.NumberOfDay || 1;

                            if (numberOfDay != 7) {
                                return (
                                    <div key={numberOfDay}>
                                        {_renderSilverStep(
                                            el.NumberOfDay,
                                            el.Point,
                                            reward.NumberOfDay,
                                            reward.TodayReceived
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={numberOfDay}>
                                        {_renderGoldStep(
                                            el.NumberOfDay,
                                            el.Point,
                                            reward.NumberOfDay,
                                            reward.TodayReceived
                                        )}
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <></>
                    )}
                </div>
                <div>&nbsp;</div>
            </div>
        );
    };

    const _renderFooter = () => {
        return (
            <div className="d-center px-0">
                <ButtonRipple
                    className="__btn_main btn_confirm_address"
                    title={"Đóng"}
                    fontSize={14}
                    onClick={() => showVisible(false)}
                />
            </div>
        );
    };

    return (
        <ResizePopup
            payload={payload}
            showVisible={showVisible}
            body={_renderComponentChildren}
            footer={_renderFooter}
            className={styles.daily_reward_popup}
        />
    );
}

export default DailyRewardPopup;
