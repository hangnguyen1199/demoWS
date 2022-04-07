import React from "react";
import ResizePopup from "./resize-popup";
import Barcode from "react-barcode";

PurchaseBarCodePopup.propTypes = {};

function PurchaseBarCodePopup(props) {
    const { payload, showVisible, type } = props;

    const _renderComponentChildren = () => {
        return (
            <>
                <Barcode width={2} value={payload?.barCode} />
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

export default PurchaseBarCodePopup;
