import IconXCircle from '../../../common/icon-x-circle';

const ConfirmModal = (props) => {
    const { onConfirm, onReturn } = props;
    return (
        <div
            className={`custom-modal  _shadow1  ${
                props?.active && 'active'
            } confirm-order-modal`}>
            <div className="overlay" onClick={() => props.hide()}></div>
            <div
                className={`wrap-content _shadow1 ${props.className ?? ''} ${
                    props.card ? 'card' : ''
                }`}
                style={props.style}>
                <div className="modal-header d-center">
                    <span className="text-center font-weight-bold ">
                        Xác nhận đã nhận được hàng
                    </span>
                    <div
                        className="d-center link-hover btn-close"
                        onClick={() => props.hide()}>
                        <IconXCircle />
                    </div>
                </div>
                <div className="text-center modal-body">
                    Tôi xác nhận tôi đã nhận và hài lòng với sản phẩm. Sẽ không
                    có yêu cầu Hoàn tiền hay Trả hàng sau khi tôi xác nhận
                </div>
                <div className="modal-footer">
                    <div className="d-center flex-column w-100">
                        <button
                            onClick={onReturn}
                            className="w-100 btn-returned">
                            Yêu cầu trả hàng
                        </button>
                        <button onClick={onConfirm} className="w-100">
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
