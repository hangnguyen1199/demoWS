import React, { useState, useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import ButtonLight from '@spo/components/common/button-light';
import Image from '@spo/components/common/image';
import AddNewAddressModal from './modal/AddNewAddressModal';
import BranchAddressModal from './modal/BranchAddressModal';
import ButtonMain from '../common/button-main';

import OrderActions from '@spo/redux/order/action';
import EventRegister, {
    ADD_ADDRESS_POPUP,
    EVENT_SHOW_POPUP,
} from '../../utils/EventRegister';
import IconUpdateAddress from '../common/icon-update-address'
import IconDelete from '../common/icon-delete';
import actions from './../../../redux/order/action';

AddressComponent.propTypes = {
    privateAddressList: PropTypes.array,
    privateBranchList: PropTypes.array,
    order: PropTypes.object,
};

AddressComponent.defaultProps = {
    privateAddressList: [],
    privateBranchList: [],
    order: {},
};

function AddressComponent(props) {
    const dispatch = useDispatch()
    const { privateAddressList, order, privateBranchList } = props
    const orderTemp = useSelector((state) => state.Order?.tempOrder)
    const idAddressNew = useSelector((state) => state.Order?.idAddressNew)
    const Name_Address_Title = 'Địa chỉ nhận hàng'
    const Name_Button_Change_Address = 'Thay đổi'
    const Name_Button_Add_Address = '+ Thêm địa chỉ mới'
    const Name_Button_Add_Address_Mobile = '+ Thêm mới'
    const [branch, setBranch] = useState({})
    const [address, setAddress] = useState({})


    const getBranch = () => {
        if (
            privateBranchList &&
            privateBranchList.length > 0 &&
            order.BranchId > 0
        ) {
            let index = privateBranchList.findIndex(function (e) {
                return e.BranchId === order.BranchId
            })
            if (index > -1) {
                return privateBranchList[index]
            }
        }
        return {}
    }

    const getAddress = () => {
        if (
            privateAddressList &&
            privateAddressList.length > 0 &&
            order.RecieveAddressId > 0
        ) {
            let index = privateAddressList.findIndex(function (e) {
                return e.UserAddressId === order.RecieveAddressId
            })
            if (index > -1) {
                return privateAddressList[index]
            }
        }
        return {}
    }

    const onSelectedAddress = (item,data) => {
        let cloneOrder = { ...order }
        cloneOrder.BranchId = 0
        cloneOrder.RecieveAddressId = item.UserAddressId
        dispatch({
            type: OrderActions.UPDATE_ORDER_VALUES,
            order: cloneOrder,
        })
        dispatch({
            type: OrderActions.SET_ORDER_ERROR_MESSAGE,
            error: {
                message: null,
            },
        })
    }
    useEffect(() => {
        setBranch(getBranch())
        if (
            order.RecieveAddressId == 0 &&
            order.BranchId == 0 &&
            privateAddressList &&
            privateAddressList.length > 0 &&
            !idAddressNew
        ) {
            let item = privateAddressList.find(function (e) {
                return e.IsDefault
            })
            if(item){
                onSelectedAddress(item,privateAddressList)
            }else{
                onSelectedAddress(privateAddressList[0],privateAddressList)
            }
        }
        setAddress(getAddress())
    }, [order.BranchId, order.RecieveAddressId, privateAddressList])

    const handleShopPopupAddress = () => {
        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: ADD_ADDRESS_POPUP,
            open: true,
            payload: {
                className:
                    'add-address-popup-wrap add-address-popup _mobile_screen order-master-component',
                title: 'Thêm địa chỉ mới',
                callback: (res) => {
                    let item = res.data.find(function (e) {
                        return e?.UserAddressId == res?.id
                    })
                    if (item) {
                        onSelectedAddress(item,res.data)
                    }
                },
            },
        })
    }

    const onUpdateAddress = (item) => {

        EventRegister.emit(EVENT_SHOW_POPUP, {
            type: ADD_ADDRESS_POPUP,
            open: true,
            payload: {
                className:
                    'add-address-popup-wrap add-address-popup _mobile_screen order-master-component',
                title: 'Chỉnh sửa địa chỉ',
                callback: (res) => {
                    // setChosenAddressIndex(res?.length - 1)
                    // onSelectedAddress(res?.length - 1)
                },
                data: item,
            },
        })
    }
    const _renderButtonUpdateAddress = () => {
        return (
            <div className="d-flex group-button-addr">
                <ButtonLight
                    className="btn-add-address btn-light-border text-uppercase"
                    title={Name_Button_Add_Address_Mobile}
                    fontSize={14}
                    onClick={handleShopPopupAddress}
                />
            </div>
        )
    }

    const _renderOptionAddress = () => {
        return <div>{_renderOptionPrivateAddress()}</div>
    }

    const onDeleteAddress = (item) => {
        dispatch({
            type: actions.DELETE_USER_ADDRESS,
            data: item.UserAddressId,
        });
    };
    const _renderOptionPrivateAddress = () => {
        return (
            <>
                {privateAddressList.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="d-flex align-items-start justify-content-between">
                                <div
                                    onClick={() => onSelectedAddress(item,privateAddressList)}
                                    className="d-flex align-items-center flex-grow-content-address"
                                >
                                    {order.RecieveAddressId === item?.UserAddressId && (
                                        <Image
                                            lazyLoad={false}
                                            src={`/images/icon/tick.svg`}
                                            style={{
                                                width: 15,
                                                paddingBottom: 5,
                                                marginRight: 1,
                                            }}
                                        />
                                    )}
                                    <div
                                        className={` ${
                                            order.RecieveAddressId === item?.UserAddressId
                                                ? 'ml-2 '
                                                : 'ml-4 color-text-gray text-weight-light'
                                        }`}
                                    >
                                        <p>
                                            {item.Lastname} {item.Firstname}
                                        </p>
                                        <p>{item.Phone}</p>
                                        <p>{item.FullAddress}</p>
                                    </div>
                                </div>
                                <div
                                    className="pr-3 d-flex align-items-start flex-row"
                                >
                                    <span onClick={() => onUpdateAddress(item)}>
                                        <IconUpdateAddress />
                                    </span>
                                    <div className='mx-1' />
                                    <span onClick={()=>onDeleteAddress(item)}>
                                        <IconDelete />
                                    </span>
                                </div>
                            </div>
                            {index !== privateAddressList.length - 1 && (
                                <hr className="cross-line cross-line-address" />
                            )}
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div className="border-shadow px-3 py-3 addr-section">
            <div className="d-flex justify-content-between align-items-baseline addr-title">
                <div className="d-flex align-items-baseline">
                    <Image
                        src={`/images/icon/marker.svg`}
                        style={{ width: 19, paddingBottom: 2 }}
                    />
                    <p className="mb-0 pl-2">{Name_Address_Title}</p>
                </div>
                {_renderButtonUpdateAddress()}
            </div>
            <hr className="cross-line"></hr>
            <div className="addr-content">{_renderOptionAddress()}</div>
        </div>
    )
}

export default AddressComponent
