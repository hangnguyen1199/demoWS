import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import ModalComponent from './ModalComponent';
import RenderInput from '@spo/components/redux-form/order/render-input';
import Image from '@spo/components/common/image';
import ButtonDark from '@spo/components/common/button-dark';

BranchAddressModal.propTypes = {
    branchList: PropTypes.array,
};

BranchAddressModal.defaultProps = {
    branchList: [],
};

function BranchAddressModal(props) {
    const { branchList, onSelectedBranch } = props;

    const [chosenBranchId, setchosenBranchId] = useState(0);

    const lbl_search = 'Tìm kiếm';
    const lbl_btn_confirm = 'Xác nhận';

    const onConfirmSelectedBranch = () => {
        onSelectedBranch(branchList[chosenBranchId]);
    };

    const _renderBranchRow = (item, index) => {
        return (
            <div
                className="branch-row-item d-flex align-items-center"
                onClick={() => setchosenBranchId(index)}>
                {index === chosenBranchId && (
                    <Image
                        src={`/images/icon/tick.svg`}
                        style={{ width: 15, paddingBottom: 5, marginRight: 9 }}
                    />
                )}
                <span
                    className={`branch-row-text ${
                        index === chosenBranchId
                            ? 'chosen-branch-color'
                            : 'ml-4'
                    }`}>
                    {item.Name}
                </span>
            </div>
        );
    };

    const _renderComponentChildren = () => {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="input-branch-search d-flex align-items-center">
                                <Image
                                    src={`/images/icon/Search_Gray.svg`}
                                    style={{
                                        paddingTop: '10px',
                                        paddingLeft: '5px',
                                    }}
                                />
                                <Field
                                    id="KeywordId"
                                    placeholder={lbl_search}
                                    name="KeywordId"
                                    component={RenderInput}
                                    type="text"
                                    className="input-order-style"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row branch-list">
                        {branchList.map((item, index) => {
                            return (
                                <div className="col-12" key={index}>
                                    {_renderBranchRow(item, index)}
                                </div>
                            );
                        })}
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <ButtonDark
                                className="btn-size-small btn-branch-address-confirm"
                                title={lbl_btn_confirm}
                                onClick={() => {
                                    onConfirmSelectedBranch();
                                }}
                                fontSize={14}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div>
            <ModalComponent
                open={props.open}
                hide={() => props.hide()}
                children={_renderComponentChildren()}
                className="branch-address-modal"
                title={props.title}></ModalComponent>
        </div>
    );
}

export default reduxForm({ form: 'BranchAddressModalForm' })(
    BranchAddressModal,
);
