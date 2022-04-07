import constants from '@spo/config/constants';
import useCustomRoute from '@spo/lib/use-custom-route';
import AppActions from '@spo/redux/app/action';
import CommonActions from '@spo/redux/common/action';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FormattedNumber, FormattedMessage } from 'react-intl';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, isValid, isInvalid } from 'redux-form';
import ButtonCircle from '@spo/components/common/button-circle';
import SelectBoxCity from '@spo/components/common/select-box-city';
import SelectBoxDistrict from '@spo/components/common/select-box-district';
import ButtonLarge from '@spo/components/common/button-large';
import Select from '@atlaskit/select';
import SizeBox from '@spo/components/item/size-box';
import ColorBox from '@spo/components/item/color-box';
import QuantityBox from '@spo/components/item/quantity-box';

import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
} from '@atlaskit/modal-dialog';


/**
 * ****************************************************************************
 * DUNGNT WrapListBranch CODE
 * wrap-sign-up.js
 *
 * description		:
 * created at		:	2020-08-03
 * created by		:	DungNT
 * package			:	spo\shared\containers\sign-up\components\wrap-sign-up.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function WrapListBranch(props) {
    const { loading, status, error, submit } = useSelector(
        (state) => state.SignUp,
    );
    // const SignIn = useSelector((state) => state.SignIn);
    // const router = useRouter();
    // const dispatch = useDispatch();
    // const formRegister = useRef(null);
    const { handleSubmit, submitting, showModal, item } = props;
    const [isOpen, setIsOpen] = useState(showModal);
    const [size, setSize] = useState(null);
    const [color, setColor] = useState(null);
    const [currentColors, setCurrentColors] = useState([]);
    const [selectCity, setSelectCity] = useState(null);
    const [branch, setBranch] = useState(null);
    const [listDistrict, setListDistrict] = useState(null);
    const [selectDistrict, setSelectDistrict] = useState(null);
    const [quantity, setQuantity] = useState(20);
    const [branchCount, setBranchCount] = useState(123);
    const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
    const onChangeDistrict = (district) => {
        setSelectDistrict(district);
    };
    const onCitySelect = (city) => {
        setSelectCity(city);
        let list = props.item.listDistrict.filter((x) => x.city_id == city.value);
        setListDistrict(list);
    }
    const onChangeColor = (val) => {
        setColor(val);
    };
    const onChangeSize = (val) => {
        setSize(val);
    };
    const onBranchSelect = (val) => {
        setBranch(val);
    };
    return (
        <>
            <ModalTransition>
                {isOpen && item && (
                    <Modal onClose={closeModal} width="x-large">
                        <ModalBody>
                            <div className="row py-2">
                                <div className=" col-5 pr-0 pl-1">
                                    <div className="d-center">
                                        <img src={item.image} style={{ maxHeight: 300 }}></img>
                                    </div>
                                    <div className=" d-center pt-2">
                                        <span className="item-name-text">
                                            {item.name}
                                        </span>
                                    </div>
                                    <div className=" d-center pt-2">
                                        <span className="item-code-text">
                                            {item.code}
                                        </span>
                                    </div>
                                    <div className="row d-center pt-2">
                                        <div className="col-6 pr-1">
                                            <span className="item-price-old float-right">
                                                {item.oldPrice}
                                            </span>
                                        </div>
                                        <div className="col-6 pl-1">
                                            <span className="item-price-new float-left">
                                                <FormattedNumber value={item.newPrice} style="currency" currency="VND" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-center pt-2">
                                        <SizeBox
                                            sizes={item.listItemSize}
                                            onChangeSize={onChangeSize}
                                            active={size}
                                        />
                                    </div>
                                    <div className="d-center pt-2">
                                        <ColorBox
                                            colors={item.listItemColor}
                                            onChangeColor={onChangeColor}
                                            active={color}
                                        />
                                    </div>
                                </div>
                                <div className="position-relative col-7 pl-0">
                                    <div className="col-12">
                                        <h4 className="text-center h4" style={{ fontWeight: "bold", fontSize: 18 }}>
                                            Xem chi nhánh còn hàng
                                        </h4>
                                    </div>
                                    <hr />
                                    <p>Tìm kiếm chi nhánh</p>
                                    <div className="row">
                                        <div className="col-6">
                                            <Select
                                                inputId="multi-select-example"
                                                options={item.listCity}
                                                isSearchable={false}
                                                placeholder="Chọn tỉnh thành"
                                                onChange={e => onCitySelect(e)}
                                                className="select-city-custom"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <Select
                                                inputId="multi-select-example"
                                                options={item.listDistrict}
                                                isSearchable={false}
                                                placeholder="Chọn quận huyện"
                                                onChange={e => onDistrictSelect(e)}
                                                className="select-city-custom"
                                            />
                                        </div>
                                    </div>
                                    {selectCity && (
                                        <div>
                                            <div className="py-3">
                                                <p>có <span>{branchCount}</span> chi nhánh có hàng tại <span>{selectCity.label}</span></p>
                                            </div>
                                            {item.listBranch.map((branch, index) => (
                                                <div>
                                                    <div className="input-group pt-2">
                                                        <div className="input-group-prepend">
                                                            <input className="radio-select-branch" type="radio" onChange={e => onBranchSelect(e)} />
                                                            <span className="pl-2">{branch.address}</span>
                                                        </div>
                                                    </div>
                                                    <div className="pb-2">
                                                        <span className="float-right branch-quantity-text">Kho: {branch.quantity} sản phẩm</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <hr />
                                    <div className="position-absolute row" style={{ top: '95%', left: 0, width: '100%' }}>
                                        <div className="col-6 d-start">
                                            <span>
                                                Số lượng
                                            </span>
                                        </div>
                                        <div className="col-6 d-end">
                                            {/* <div className="input-group mb-3" style={{ height: 35 }}>
                                                <div className="input-group-prepend">
                                                    <button className="button-prepend" type="button">-</button>
                                                </div>
                                                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
                                                <div className="input-group-append">
                                                    <button className="button-append" type="button">+</button>
                                                </div>
                                            </div> */}
                                            <QuantityBox
                                                value={20} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <hr />
                            <div className="row pb-3">
                                <div className="col-4">
                                    <ButtonLarge
                                        className="button-chat-now float-right"
                                        title="Chat ngay"
                                        image="/images/icon/chat.svg"
                                    />
                                </div>
                                <div className="col-4 d-center">
                                    <ButtonLarge
                                        className="button-add-to-cart "
                                        title="Thêm vào giỏ hàng"
                                    />
                                </div>
                                <div className="col-4">
                                    <ButtonLarge
                                        className="button-buy-now float-left"
                                        title="Mua ngay"
                                    />
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                )}
            </ModalTransition>
        </>
    );
}

WrapListBranch = reduxForm({
    form: 'WrapListBranch',
    onSubmitFail: (errors) => {
        // focus first err
        // document.getElementById(Object.keys(errors)[0]).focus();
        console.log('err', errors);
    },
})(WrapListBranch);

WrapListBranch = connect((state) => ({
    // initialValues: {}, // pull initial values from account reducer
}))(WrapListBranch);
export default WrapListBranch;
