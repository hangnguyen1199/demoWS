// import IconSuccess from '@spo/icons/icon-success';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';
import AuthActions from '../../../../redux/auth/action';
import { GetMsg } from '../../../config/Message';
import { POPUP_SUCCESS_TYPE, SECOND_POPUP } from '../../../utils/EventRegister';
import Utils from '../../../utils/utils';
import FormInputEmail from './change-email/form-input-email';
import FormInputPhone from './change-phone/form-input-phone';
import VerifyOtpCommon from './change-phone/verify-otp';
import ResizePopup from './resize-popup';
import Slider from 'react-slick';
import Image from '../image';

function ShowImagePopup (props) {
    const { payload, showVisible } = props;
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const formRegister = useRef(null);
    const { onStepChange } = props;
    const settingMain = {
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    //----------------------------------------------
    // Effect
    //---------------------------------------------- 
    useEffect(() => {
        console.log("data?.ReviewImages",payload?.images)
    }, [payload?.images]);

    return (
        <div className="show-image-popup">
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 20,
                    fontSize: 14,
                    fontWeight: 'normal',
                }}>
                {payload?.title}
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                <Slider
                    {...settingMain}
                    className="stretch_slide">
                    {payload?.images.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className=" overflow-hidden">
                                <div className="container-raito">
                                    <div className="raito">
                                        <Image
                                            lazy_offset={400}
                                            lazy_height={800}
                                            lazyLoad={false}
                                            className="w-100 h-100 pointer"
                                            src={item?.LinkFile}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    );
}
ShowImagePopup.defaultProps = {
    payload: {
        title: 'Đã lưu thành công',
    },
};

export default ShowImagePopup;
