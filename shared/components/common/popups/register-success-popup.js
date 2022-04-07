import React from 'react';
import ImagesCongratulation from '../../../../public/images/icon/icon_success.png';
import ButtonPopup from '../button-popup';
import IconClose from '../icon-close';
import IconX from '@spo/components/common/icon-x';
import ComponentPopupsType from './component/component-popups-type';
import constants from '@spo/config/constants';

function RegisterSuccessPopup(props) {
    const { payload, showVisible } = props;
    const Content = (props) => {
        return (
            <>
                <p className="title-header-success">
                    Đăng ký thành công tài khoản
                </p>
                <div className="register-popups-content">
                    <p className="title-main-content">
                        Cảm ơn bạn đã lựa chọn & đăng ký sử dụng <br />{' '}
                        <span className="title-main-content-red">
                            {constants.TITLE_POPUPS.name}
                        </span>
                        .
                    </p>
                    <div className="title-main-content-margin-top">
                        <p className="title-main-content">
                            <span className="title-main-content-red">
                                {constants.TITLE_POPUPS.name}
                            </span>{' '}
                            xin tặng bạn:
                        </p>
                        <p className="title-main-content-black">
                            . 200 Điểm Bạc
                        </p>
                        <p className="title-main-content-black">
                            . 01 Mã Só Mua Hàng giảm 12% (
                            <span className="title-main-content-red">
                                123456789
                            </span>
                            )
                        </p>
                    </div>
                    <div className="title-main-content-margin-top">
                        <p className="title-main-content">
                            Với tài khoản{' '}
                            <span className="title-main-content-red">
                                {constants.TITLE_POPUPS.name}
                            </span>
                            , bạn được hưởng rất nhiều ưu đãi của{' '}
                        </p>
                        <p className="title-main-content title-main-content-i">
                            <i>
                                Chính Sách Khách Hàng Thành Viên <br /> của FM
                            </i>
                        </p>
                    </div>

                    <div className="title-main-content-margin-top">
                        <p className="title-main-content">
                            Vui lòng cập nhật Thông tin cá nhân dể được nhận
                            thêm nhiều quà tặng
                        </p>
                    </div>
                </div>
            </>
        );
    };
    return (
        <ComponentPopupsType
            content={<Content {...props} />}
            icon={<img src={ImagesCongratulation} />}
            showVisible={showVisible}
            callback={payload}
        />
    );
}
export default RegisterSuccessPopup;
