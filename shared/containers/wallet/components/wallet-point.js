import React, { useEffect, useState } from "react";
import IconGift from "../../../components/common/icons/icon-gift";
import { useDispatch, useSelector } from "react-redux";
import constants from "../../../config/constants";
import AuthActions from "../../../../redux/auth/action";
import WalletActions from "../../../../redux/wallet/action";
import Currency from "react-currency-formatter";
import moment from "moment";
import BuyPoint from "./buy-point";
import EventRegister, {
    BUY_POINT_POPUP,
    EVENT_SHOW_POPUP,
    POINTS_TRANSACTION_DETAIL_POPUP,
} from "../../../utils/EventRegister";
import ButtonDark from "@spo/components/common/button-dark";
import ButtonMain from "../../../components/common/button-main";

const WalletPoint = (props) => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.Auth.data.User);
    const pointHistories = useSelector((state) => state.Wallet.pointHistories);
    const [showBuyPoint, setShowBuyPoint] = useState(false);
    const {
        data: { settingMaster },
    } = useSelector((state) => state.Common);
    useEffect(() => {
        dispatch({ type: AuthActions.GET_USER });
        dispatch({ type: WalletActions.LOAD_POINT_HISTORY });
    }, []);
    function getLastNormalPoint() {
        for (let index = 0; index < pointHistories.length; index++) {
            if (pointHistories[index].NormalPoint > 0) {
                return pointHistories[index].CreatedAt;
            }
        }
    }
    function onCloseBuyPoint() {
        setShowBuyPoint(false);
    }

    const isNumeric = (num) => {
        return !isNaN(num);
    };

    const calcMoney = (point) => {
        if (!isNumeric(point)) {
            return 0;
        }
        if (point && settingMaster?.Setting?.PointToMoney) {
            return point * settingMaster?.Setting?.PointToMoney;
        }
        return 0;
    };

    const handleShopPopupBuyPoint = () => {
    // setIsShowAddAddressModel(true)
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: BUY_POINT_POPUP,
            open: true,
            payload: {
                className: "",
                title: "Nạp điểm vàng",
                callback: () => {},
            },
        });
    };

    const showPointTransactionDetailPopup = (id) => {
        dispatch({
            type: WalletActions.LOAD_POINT_HISTORY_DETAIL,
            data: {
                type: constants.HISTORY_POINT_TYPE,
                code: id,
            },
        });

        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: POINTS_TRANSACTION_DETAIL_POPUP,
            open: true,
            payload: {
                className: "",
                title: "Lịch sử giao dịch",
                callback: () => {},
            },
        });
    };

    const _renderPointNumber = (img, point, dueDate, isGold = false) => {
        return (
            <>
                <div className="d-flex align-items-center">
                    <span className="d-center">
                        <img src={img} className="img-point" />
                        <span className={`point-value ${isGold ? "text-gold" : ""}`}>
                            {point}
                        </span>
                    </span>
                    <span style={{ paddingRight: 4, paddingLeft: 10 }}>&asymp;</span>
                    <div className="text-size-res">
                        <span className="price">
                            <Currency
                                quantity={calcMoney(point)}
                                currency="VND"
                                pattern="##,### !"
                                symbol=""
                            />
                        </span>
                        <span className="currency" style={{ fontSize: "15px" }}>
              VND
                        </span>
                    </div>
                </div>
                <div>
                    <span className="text-size-res">
                        <span className="font-weight-light">Hạn sử dụng:</span> {dueDate}
                    </span>
                </div>
            </>
        );
    };

    const _renderButtonBuyMore = () => {
        return (
            <>
                <div>
                    <ButtonMain
                        className="btn-size-custom text-capitalize"
                        title="Mua thêm"
                        fontSize={14}
                        onClick={() => {
                            handleShopPopupBuyPoint();
                        }}
                    />
                </div>
            </>
        );
    };

    const _renderPointInfo = () => {
        return (
            <>
                <div className="d-flex justify-content-between section-header">
                    <div className="s-title">{lbl_point}</div>
                    <div className="s-descripton">
                        <div className="d-center">
                            <span style={{ fontWeight: 500, paddingRight: 5 }}>Tổng:</span>
                            <span style={{ color: "#ff2c00", paddingRight: 4 }}>
                                {userProfile.NormalPoint}
                            </span>
                            <span style={{ paddingRight: 4 }}>&asymp;</span>
                            <div>
                                <span className="price">
                                    <Currency
                                        quantity={calcMoney(userProfile.NormalPoint)}
                                        currency="VND"
                                        pattern="##,### !"
                                        symbol=""
                                    />
                                </span>
                                <span className="currency fontsize11">VND</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-content">
                    <div className="d-flex justify-content-between point-row">
                        <div>
                            {_renderPointNumber(
                                "/images/icon/wallet/silver_coin.svg",
                                userProfile.NormalPoint,
                                moment(getLastNormalPoint())
                                    .add(1, "years")
                                    .format("DD.MM.YYYY")
                            )}
                        </div>
                        <div className="d-flex align-items-end">
                            <span className="font-weight-light text-size-res">
                Nếu trong <i className="font-weight-normal">01</i> năm không
                phát sinh giao dịch sẽ bị hủy
                            </span>
                        </div>
                    </div>
                    <div
                        className="d-flex justify-content-between point-row"
                        style={{ paddingTop: "15px" }}
                    >
                        <div>
                            {_renderPointNumber(
                                "/images/icon/wallet/gold_coin.svg",
                                userProfile.GoldPoint,
                                "Không thời hạn",
                                true
                            )}
                        </div>
                        <div
                            className="d-flex align-items-start s-button-group"
                            style={{ paddingTop: 5 }}
                        >
                            {_renderButtonBuyMore()}
                        </div>
                    </div>
                    <div className="d-center" style={{ paddingTop: "15px" }}>
                        <span className="point-rate">
                            <i>
                Hệ số quy đổi: <span className="font-weight-normal">01</span>{" "}
                điểm ={" "}
                                <span className="font-weight-normal">
                                    {settingMaster?.Setting?.PointToMoney}
                                </span>{" "}
                                <span className="currency">VND</span>
                            </i>
                        </span>
                    </div>
                </div>
            </>
        );
    };

    const _renderRowTransaction = (id, point, icon, isDeposit, createdAt) => {
        return (
            <>
                <div
                    className="d-flex justify-content-between transaction-row"
                    onClick={() => {
                        showPointTransactionDetailPopup(id);
                    }}
                >
                    <div className="d-center">
                        <img src={icon} className="img-point" />
                        <span className="font-weight-light text-size-res">
                            {moment(createdAt).format("DD.MM.YYYY - HH:mm")}
                        </span>
                    </div>
                    <div className="d-center">
                        <span className={` text-size-res ${isDeposit ? 'text-green' : 'text-red'}`}>
                            {isDeposit ? '+ ' : '- '}
                            {point}
                        </span>
                    </div>
                </div>
            </>
        );
    };

    const _renderTransaction = () => {
        return (
            <>
                <div
                    className="d-flex justify-content-between section-header"
                    style={{ marginBottom: "15px" }}
                >
                    <div className="s-title">{lbl_transaction}</div>
                    <div className="d-center s-descripton font-weight-light">
                        <i>
              Lịch sử giao dịch <span className="font-weight-normal">03</span>{" "}
              tháng gần nhất
                        </i>
                    </div>
                </div>
                <div className="section-content">
                    {pointHistories?.map((item, index) => {
                        const point =
              item?.GoldPoint > 0 ? item?.GoldPoint : item?.NormalPoint;
                        const icon =
              item?.GoldPoint > 0
                  ? "/images/icon/wallet/gold_coin.svg"
                  : "/images/icon/wallet/silver_coin.svg";
                        const isDeposit = point >= 0;
                        const createdAt = item?.CreatedAt;
                        return (
                            <div key={index}>
                                {_renderRowTransaction(
                                    item?.Id,
                                    point,
                                    icon,
                                    isDeposit,
                                    createdAt
                                )}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    const lbl_point = "Điểm Tích Lũy";
    const lbl_transaction = "Lịch sử giao dịch";

    return (
        <div className="wallet-point-master">
            <div className="outline-section">{_renderPointInfo()}</div>
            <div className="outline-section">{_renderTransaction()}</div>
        </div>
    );
};

export default WalletPoint;
