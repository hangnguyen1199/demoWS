import IconXCircle from '../../../common/icon-x-circle';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ReturnReasonModal = (props) => {
    const { listReturnReason } = useSelector((state) => state.Common.data);
    const [choice, setChoice] = useState(null);
    const handleChoice = (item) => {
        setChoice(item);
    };

    return (
        <div
            className={`custom-modal  _shadow1  ${'active'} confirm-order-modal cancel-order-modal`}>
            <div className="overlay" onClick={() => props.hide()}></div>
            <div
                className={`wrap-content _shadow1 ${props.className ?? ''} ${
                    props.card ? 'card' : ''
                }`}
                style={props.style}>
                <div className="modal-header d-center">
                    <span className="text-center font-weight-bold ">
                        Chọn lý do Trả hàng/ Hoàn tiền
                    </span>
                    <div
                        className="d-center link-hover btn-close"
                        onClick={() => props.hide()}>
                        <IconXCircle />
                    </div>
                </div>
                <div className="modal-body">
                    <ul className="cancel-reason">
                        {listReturnReason?.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleChoice(item)}
                                className={`cancel-reason--item ${
                                    choice?.Id == item?.Id && 'active'
                                }`}>
                                {item?.Name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="modal-footer">
                    <div className="d-center flex-column w-100">
                        <button
                            onClick={() => props?.handleClick(choice)}
                            className="w-100 btn-returned">
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnReasonModal;
