import React, { useState, useRef, useEffect } from "react";
import ResizePopup from "./resize-popup";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import IconChevronRight from "@spo/components/common/icon-chevron-right";
import NumberFormat from "react-number-format";
import EventRegister, {
    BUY_POINT_BANK_POPUP,
    EVENT_SHOW_POPUP,
} from "../../../utils/EventRegister";
import useCustomRoute from '@spo/lib/use-custom-route';

BuyGoldPointPopup.propTypes = {};

function BuyGoldPointPopup(props) {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const { payload, showVisible, type } = props;
    const [moneyValue, setMoneyValue] = useState(0);
    const [pointValue, setPointValue] = useState("");
    const [isDivisibleByThoundsand, setIsDivisibleByThoundsand] = useState(true);

    const {
        data: { settingMaster },
    } = useSelector((state) => state.Common);

    const lbl_buy_point = "Số điểm cần mua";
    const lbl_note = "Điểm số của bạn là bội số của 1000";
    const lbl_other_points = "Số khác";
    const lbl_total_money = "Số tiền cần thanh toán là:";

    const suggestPoint = [1000, 2000, 3000, 4000, 5000];

    const onGoBranchList = () => {
        if (!isDivisibleByThoundsand || !moneyValue) {
            setIsDivisibleByThoundsand(false);
            if (inputRef) {
                inputRef.current.focus();
            }
            return;
        }
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: BUY_POINT_BANK_POPUP,
            open: false,
            payload: {},
        });
        useCustomRoute(dispatch, "/branch-list");
    };

    const isNumeric = (num) => {
        return !isNaN(num);
    };

    const calcMoney = (point) => {
        if (!isNumeric(point)) {
            return 0;
        }
        if (point && settingMaster?.Setting?.PointToMoney) {
            let total = point * settingMaster?.Setting?.PointToMoney;
            let rate = settingMaster?.Setting?.DiscountPoint ?? 1;
            return total - (total * rate) / 100;
        }
        return 0;
    };

    const handleChangePoint = (e) => {
        setPointValue(e);
    };

    const handleSelecteSuggestPoint = (val, type = 0) => {
        if (type) {
            setPointValue("");
            if (inputRef) {
                inputRef.current.focus();
            }
        } else {
            setPointValue(val);
        }
    };

    useEffect(() => {
        setMoneyValue(calcMoney(pointValue));
    }, [pointValue]);

    const onBank = () => {
        if (!isDivisibleByThoundsand || !moneyValue) {
            setIsDivisibleByThoundsand(false);
            if (inputRef) {
                inputRef.current.focus();
            }
            return;
        }
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: BUY_POINT_BANK_POPUP,
            open: true,
            payload: {
                className: "",
                title: "Nạp điểm vàng",
                money: moneyValue,
                point: pointValue,
                code: "DTL",
                callback: () => {},
            },
        });
    };

    const _renderPaymentMethodLayout = () => {
        return (
            <>
                <div
                    style={{
                        textTransform: "uppercase",
                        fontSize: 16,
                        fontWeight: 500,
                        padding: "15px 0px",
                        borderBottom: "0.5px solid #D8D7D7",
                        borderTop: "0.5px solid #D8D7D7",
                        width: "100%",
                    }}
                >
          Phương thức thanh toán
                </div>
                <div
                    className="w-100 d-flex justify-content-between align-items-center py-3 pointer"
                    onClick={onBank}
                >
                    <div
                        className="d-center"
                        style={{
                            border: "0.5px solid #333",
                            width: 50,
                            height: 43,
                            borderRadius: 4,
                        }}
                    >
                        <img src="/images/icon/wallet/banking.svg" style={{ width: 20 }} />
                    </div>
                    <div className="w-100" style={{ paddingLeft: 15 }}>
            Chuyển khoản
                    </div>
                    <div>
                        <IconChevronRight fontSize={16} />
                    </div>
                </div>
                <div
                    className="w-100 d-flex justify-content-between align-items-center pointer"
                    onClick={onGoBranchList}
                >
                    <div
                        className="d-center"
                        style={{
                            border: "0.5px solid #333",
                            width: 50,
                            height: 43,
                            borderRadius: 4,
                        }}
                    >
                        <img src="/images/icon/wallet/store.svg" style={{ width: 20 }} />
                    </div>
                    <div className="w-100" style={{ paddingLeft: 15 }}>
            Mua tại cửa hàng FM
                    </div>
                    <div>
                        <IconChevronRight fontSize={16} />
                    </div>
                </div>
            </>
        );
    };

    const withValueLimit = ({ floatValue }) =>
        floatValue === undefined || floatValue <= 1000000;

    const _renderComponentChildren = () => {
        return (
            <div className="buy-point-content">
                <div className="row mx-0">
                    <div className="col-12 px-0">
                        <div
                            className={`d-flex flex-column input-point ${
                                !isDivisibleByThoundsand ? "border-error" : ""
                            }`}
                        >
                            <div>{lbl_buy_point}</div>
                            <div
                                className="text-right"
                                style={{ fontSize: 20, fontWeight: 500, lineHeight: "20px" }}
                            >
                                {/* <Currency
                  quantity={pointBuy}
                  currency="VND"
                  pattern="##,### !"
                  symbol=""
                /> */}
                                <NumberFormat
                                    value={pointValue}
                                    getInputRef={inputRef}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    isAllowed={withValueLimit}
                                    allowEmptyFormatting={true}
                                    onValueChange={(values) => {
                                        const { formattedValue, value } = values;
                                        setIsDivisibleByThoundsand(value % 1000 === 0);
                                        handleChangePoint(value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`col-12 px-0 d-end py-2 ${
                            !isDivisibleByThoundsand ? "text-error" : ""
                        }`}
                    >
                        {lbl_note}
                    </div>
                    {suggestPoint.map((item, index) => {
                        return (
                            <div className="col-4 px-0" key={index}>
                                <div
                                    className="point-suggest pointer"
                                    onClick={() => handleSelecteSuggestPoint(item)}
                                >
                                    {item}
                                </div>
                            </div>
                        );
                    })}
                    <div className="col-4 px-0">
                        <div
                            className="point-suggest"
                            onClick={() => handleSelecteSuggestPoint(0, 1)}
                        >
                            {lbl_other_points}
                        </div>
                    </div>
                    <div className="col-12 px-0 d-start flex-column align-items-start py-2">
                        <div className="d-flex">
                            {lbl_total_money}
                            <div className="px-1" style={{ fontWeight: 500 }}>
                                <Currency
                                    quantity={moneyValue}
                                    currency="VND"
                                    pattern="##,### !"
                                    symbol=""
                                />
                                <span className="currency fontsize11">VND</span>
                            </div>
                        </div>
                        <span>
                            {settingMaster?.Setting?.DiscountPoint && (
                                <>
                                    {`* Quý khách được chiết khấu ${settingMaster?.Setting?.DiscountPoint}%`}
                                </>
                            )}
                        </span>
                    </div>
                    <div className="col-12 px-0 d-start flex-column align-items-start">
                        {_renderPaymentMethodLayout()}
                    </div>
                </div>
            </div>
        );
    };

    const _renderFooter = () => {
        return (
            <div className="row">
                <div className="col-12 d-flex justify-content-center"></div>
            </div>
        );
    };

    return (
        <ResizePopup
            payload={payload}
            showVisible={showVisible}
            body={_renderComponentChildren}
            footer={_renderFooter}
        />
    );
}

export default BuyGoldPointPopup;
