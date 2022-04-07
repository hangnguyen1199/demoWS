import React, { useEffect } from "react";
import ResizePopup from "./resize-popup";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import useCustomRoute from "@spo/lib/use-custom-route";
import EventRegister, {
    USER_QR_DATA_POPUP,
    EVENT_SHOW_POPUP,
} from "../../../utils/EventRegister";
import PageList from "../../../config/PageList";

UserQrDataPopup.propTypes = {};

function UserQrDataPopup (props) {
    const dispatch = useDispatch();
    const { payload, showVisible, type } = props;
    let qrData = useSelector((state) => state.UserLogged.data.qrData);
    if (!qrData) {
        qrData = "  ";
    }

    const _onClick = (index) => {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: USER_QR_DATA_POPUP,
            open: false,
            payload: {},
        });
        const tmpRoute = `${PageList.WALLET.SERVER  }?tab=${  index}`;
        useCustomRoute(dispatch, tmpRoute);
    };

    const _renderButton = (content, index) => {
        return (
            <div
                onClick={() => _onClick(index)}
                style={{
                    border: "0.5px solid #D8D7D7",
                    fontSize: "13px",
                    boxShadow: "3px 3px 6px #0000000F",
                    borderRadius: "13px",
                }}
            >
                {"Sử dụng"}
                <br></br>
                <span style={{ fontWeight: 500 }}>{content}</span>
            </div>
        );
    };

    const _renderComponentChildren = () => {
        return (
            <>
                <div
                    className="d-flex flex-column py-3"
                    style={{ borderBottom: "1px solid #D8D7D7" }}
                >
                    <div className="d-center">Vui lòng đưa cho Thu Ngân mã này</div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <Barcode width={2} value={qrData} />
                        <QRCode
                            value={qrData}
                            renderAs={"svg"}
                            imageSettings={{
                                src: "/images/icon/logo_fm.svg",
                                height: 15,
                                width: 25,
                            }}
                        />
                    </div>
                    <div className="d-center text-center pt-2">
						Barcode & QR Code chỉ được sử dụng 01 lần & có thời hạn trong vòng
						24 giờ
                    </div>
                </div>
                <div
                    className="row pt-2 text-center"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                >
                    <div className="col-4 px-0 pr-2">
                        {_renderButton("Điểm Tích Lũy", 0)}
                    </div>
                    <div className="col-4 px-0">{_renderButton("MSMH", 1)}</div>
                    <div className="col-4 px-0 pl-2">{_renderButton("MPVC", 2)}</div>
                </div>
            </>
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

export default UserQrDataPopup;
