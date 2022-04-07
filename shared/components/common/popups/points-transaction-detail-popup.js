import React, { useEffect } from "react";
import ResizePopup from "./resize-popup";
import { useSelector } from "react-redux";
import moment from "moment";

PointsTransactionDetailPopup.propTypes = {};

function PointsTransactionDetailPopup(props) {
    const { payload, showVisible, type } = props;
    const pointHistoryDetail = useSelector(
        (state) => state.Wallet.pointHistoryDetail
    );

    const _renderComponentChildren = () => {
        return (
            <div className="d-flex flex-column mx-0" style={{ minWidth: 300 }}>
                <div
                    className="d-center py-3"
                    style={{
                        fontSize: 24,
                        fontWeight: 400,
                        borderBottom: "0.5px solid #D8D7D7",
                    }}
                >
                    {pointHistoryDetail?.Point < 0 ? "-" : "+"}{" "}
                    {pointHistoryDetail?.Point}
                </div>
                <div>
                    <div
                        className="d-flex justify-content-between py-2"
                        style={{ borderBottom: "0.25px solid #D8D7D7" }}
                    >
                        <div>Mã giao dịch</div>
                        <div>{pointHistoryDetail?.TransactionCode}</div>
                    </div>
                    <div
                        className="d-flex justify-content-between py-2"
                        style={{ borderBottom: "0.25px solid #D8D7D7" }}
                    >
                        <div>Thời gian</div>
                        <div>
                            {moment(pointHistoryDetail?.CreatedAt).format(
                                "DD.MM.YYYY - HH:mm"
                            )}
                        </div>
                    </div>
                    <div
                        className="d-flex justify-content-between py-2"
                        style={{ borderBottom: "0.25px solid #D8D7D7" }}
                    >
                        <div>Nơi chuyển</div>
                        <div>FM Plus</div>
                    </div>
                    <div
                        className="d-flex justify-content-between py-2"
                        style={{ borderBottom: "0.25px solid #D8D7D7" }}
                    >
                        <div>Số hóa đơn</div>
                        <div>{pointHistoryDetail?.Code}</div>
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

export default PointsTransactionDetailPopup;
