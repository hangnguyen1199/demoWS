import React from "react";
import ResizePopup from "./resize-popup";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import Image from "@spo/components/common/image";

BuyGoldPointBankPopup.propTypes = {};

function BuyGoldPointBankPopup(props) {
    const { payload, showVisible, type } = props;

    const {
        data: { settingMaster },
    } = useSelector((state) => state.Common);
    const { data } = useSelector((state) => state.Auth);

    const lbl_banking_amount = "Số tiền cần chuyển";
    const lbl_currency_unit = "VND";
    const lbl_banking_info = "THÔNG TIN CHUYỂN KHOẢN";
    const lbl_note = "LƯU Ý";
    const lbl_account_number = "Số tài khoản";
    const lbl_account_name = "Tên chủ tài khoản";
    const lbl_account_bank = "Ngân hàng";
    const lbl_description = "Quý Khách vui lòng chuyển tiền với nội dung sau:";

    const renderContentTransfer = () =>
        `${data?.User?.CustomerId  } ${  payload?.code  } ${  payload?.point}`;

    const _renderNote = () => {
        return (
            <>
                <div className="header-content ">{lbl_note}</div>
                <div>
          1. <span style={{ fontWeight: 500 }}>Điểm Vàng</span> sẽ được cộng vào{" "}
                    <span style={{ fontWeight: 500 }}>Ví FM</span> của Quý Khách sau khi
          chúng tôi nhận được thông tin chuyển khoản thành công.
                </div>
                <div>
          2. Thanh toán từ{" "}
                    <span style={{ fontWeight: 500 }}>07:00 - 22:30</span> quý sẽ nhận
          ngày <span style={{ fontWeight: 500 }}>Điểm Vàng</span>. Ngoài khung
          giờ trên, quý khách sẽ được nhận vào sáng hôm sau.
                </div>
                <div>
          3. Mọi thắc mắc về vấn đề chuyển khoản, Quý Khách vui lòng liên hệ với
          Bộ phận <span style={{ fontWeight: 500 }}>Chăm Sóc Khách Hàng</span>{" "}
                    <span style={{ color: "#ff2c00", fontWeight: 500 }}>
            090.1800.888
                    </span>{" "}
          (Bấm phím 8) để được hỗ trợ.
                </div>
            </>
        );
    };

    const _renderBankingInfo = () => {
        return (
            <>
                <div className="header-content">{lbl_banking_info}</div>
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex ">
                            <p style={{ width: "150px", marginBottom: 0 }}>
                                {lbl_account_number}
                            </p>
                            <span>: {settingMaster?.Setting?.BankAccountNumber}</span>
                        </div>
                        <Image
                            src={`/images/icon/icon_copy.svg`}
                            className="pointer img-res"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    settingMaster?.Setting?.BankAccountNumber
                                );
                            }}
                        />
                    </div>
                    <div className="d-flex">
                        <div className="d-flex ">
                            <p style={{ width: "150px", marginBottom: 0 }}>
                                {lbl_account_name}
                            </p>
                            <span>: {settingMaster?.Setting?.BankAuthor}</span>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="d-flex ">
                            <p style={{ width: "150px", marginBottom: 0 }}>
                                {lbl_account_bank}
                            </p>
                            <span>: {settingMaster?.Setting?.BankBranch}</span>
                        </div>
                    </div>
                    <div>
                        <span>{lbl_description}</span>
                        <div className="d-flex justify-content-end">
                            <span className="text-center" style={{ width: "100%" }}>
                                {renderContentTransfer()}
                            </span>
                            <span>
                                <Image
                                    src={`/images/icon/icon_copy.svg`}
                                    className="pointer img-res"
                                    onClick={() => {
                                        navigator.clipboard.writeText(renderContentTransfer());
                                    }}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const _renderComponentChildren = () => {
        return (
            <div className="buy-point-bank-content">
                <div className="row pt-2">
                    <div className="col-12 px-0 div-section">
                        <div className="text-center">{lbl_banking_amount}</div>
                        <div className=" d-flex justify-content-center money-amount">
                            <div style={{ fontSize: 25 }}>
                                <Currency
                                    quantity={payload?.money}
                                    currency="VND"
                                    pattern="##,### !"
                                    symbol=""
                                />
                            </div>
                            <div style={{ fontSize: 25, marginLeft: "8px" }}>
                                {lbl_currency_unit}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 px-1 pt-2 div-section">
                        {_renderBankingInfo()}
                    </div>
                    <div className="col-12 px-1 pt-2">{_renderNote()}</div>
                </div>
            </div>
        );
    };

    const _renderFooter = () => {
        return <></>;
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

export default BuyGoldPointBankPopup;
