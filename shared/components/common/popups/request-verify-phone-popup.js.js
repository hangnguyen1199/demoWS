// import IconSuccess from '@spo/icons/icon-success';
import * as Validator from '@spo/lib/validator';
import MasterActions from '@spo/redux/master/action';
import OrderActions from '@spo/redux/order/action';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import RenderMatInput from '../../redux-form/common/render-mat-input';
import RenderMatSelect from '../../redux-form/common/render-mat-select';
import ButtonDark from '../button-dark';
import ClosePopupBtn from './close-popup-btn';
import CustomFrame from '../custom-frame';
import RenderTextRadio from '../../redux-form/common/render-text-radio';
import constants from '@spo/config/constants';
import UseWindowSize from '@spo/lib/use-window-size';
import ResizePopup from './resize-popup';
import ButtonRipple from '../button-ripple';
import { useCustomRoute } from '@spo/lib/use-custom-route';
import PageList from '../../../config/PageList';

function RequestVerifyPhonePopup(props) {
    const { payload, showVisible } = props;
    const handleClick = () => {
        if (typeof payload.callback == 'function') {
            payload.callback();
        }
        showVisible(false);
    };

    const dispatch = useDispatch();

    const { handleSubmit, ProvinceId, CommuneId, DistrictId } = props;
    // const [Provinces, setProvinces] = useState([]);
    const [Districts, setDistricts] = useState([]);
    const [Communes, setCommunes] = useState([]);
    // const [ProvinceId, setProvinceId] = useState(null);
    // const [DistrictId, setDistrictId] = useState(null);
    // const [CommuneId, setCommuneId] = useState(null);
    const {
        data: { Genders, Provinces },
    } = useSelector((state) => state.Master);

    const refParent = useRef(false);
    const headerRef = useRef(false);
    const bodyRef = useRef(false);
    const footerRef = useRef(false);
    const [maxBodyHeight, setMaxBodyHeight] = useState('calc(80%');
    useEffect(() => {
        let marginTop = 56;
        if (window.innerWidth < constants.WINDOW_SIZE.MEDIUM) {
            marginTop = 0;
        }
        let maxHeight =
            window.outerHeight -
            (headerRef.current.clientHeight +
                footerRef.current.clientHeight +
                marginTop);
        setMaxBodyHeight(maxHeight);
    }, []);

    const renderBody = () => {
        return (
            <>
                <div style={{marginTop:20}}> 
                    Quý khách chưa xác thực số điện thoại.
                    Xác thực ngay để nhận nhiều ưu đãi.
                </div>
            </>
        );
    };
    const renderFooter = () => {
        return (
            <div className="col-12 d-center px-0">
                <ButtonRipple
                    className="__btn_main btn_confirm_address"
                    title={"Xác thực ngay"}
                    onClick={handleClick}
                    fontSize={14}
                />
            </div>
        );
    };
    return (
        <ResizePopup
            payload={payload}
            showVisible={showVisible}
            body={renderBody}
            footer={renderFooter}
        />
    );
}
RequestVerifyPhonePopup.defaultProps = {
    payload: {
        title: 'Đã lưu thành công',
    },
};
RequestVerifyPhonePopup = reduxForm({
    form: 'RequestVerifyPhonePopup',
    enableReinitialize: true,
})(RequestVerifyPhonePopup);
const selector = formValueSelector('RequestVerifyPhonePopup');
RequestVerifyPhonePopup = connect((state) => {
    const ProvinceId = selector(state, 'ProvinceId');
    const DistrictId = selector(state, 'DistrictId');
    const CommuneId = selector(state, 'CommuneId');
    return {
        ProvinceId: ProvinceId,
        CommuneId: CommuneId,
        DistrictId: DistrictId,
    };
})(RequestVerifyPhonePopup);
export default RequestVerifyPhonePopup;
