import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderInput from '@spo/components/redux-form/help-center/render-input';
import { required } from '../../library/validator';
import CustomList from '../../components/help-center/custom-list';
import MailIconUrl from '@spo/public/images/icon/ic_mail.svg';
import ChatIconUrl from '@spo/public/images/icon/chat.svg';
import CallIconUrl from '@spo/public/images/icon/ic_call.svg';
import ClearIconUrl from '@spo/public/images/icon/close.svg';
import ArrowRightIconUrl from '@spo/public/images/icon/icon-right-arrow.svg';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const ArrowRightIcon = () => {
    return <img src={ArrowRightIconUrl} />;
};
const ClearIcon = () => {
    return <img src={ClearIconUrl} />;
};
const ChatOnlineIcon = () => {
    return <img src={ChatIconUrl} />;
};
const MailIcon = () => {
    return <img src={MailIconUrl} />;
};
const CallIcon = () => {
    return <img src={CallIconUrl} />;
};
const section1 = [
    {
        Icon: <CallIcon />,
        Name: 'Gọi điện',
        Value: '090.1800.888 (Bấm số 8)',
        Href: 'tel:0901800888',
    },
    {
        Icon: <MailIcon />,
        Name: 'Email',
        Value: 'cskh@fmstyle.com.vn',
        Href: 'mailto:cskh@fmstyle.com.vn',
    },
    {
        Icon: <ChatOnlineIcon />,
        Name: 'Chat trực tuyến',
    },
];
const section2 = [
    {
        Name: 'Nam',
    },
    {
        Name: 'Nữ',
    },
    {
        Name: 'Trẻ em',
    },
];
const sectionPolicy = [
    {
        Name: 'Chính Sách Khách Hàng Thành Viên',
        Url: '#',
    },
    {
        Name: 'Quy Định Đổi Trả, Bảo Hành',
        Url: '#',
    },
    {
        Name: 'Điều Khoản Sử Dụng',
        Url: '#',
    },
    {
        Name: 'Chính Sách Bảo Mật & Chia Sẻ Thông Tin',
        Url: '#',
    },
];
const faqs = [
    {
        Name: 'Quyền lợi thẻ thành viên',
        Url: '#',
    },
    {
        Name: 'Tài khoản',
        Url: '#',
    },
    {
        Name: 'Thanh toán',
        Url: '#',
    },
    {
        Name: 'Mua hàng online',
        Url: '#',
    },
];
const HelpCenterContainer = (props) => {
    const { handleSubmit } = props;
    const nameHistory = useSelector((state) => state.Auth.data.User);
    const onSubmit = (data) => {
        console.log(data);
    };
    
    return (
        <div className="help-center-page">
            <div className="help-center--inner">
                {/* Mobile */}
                <div className="d-block d-md-none">
                    <section className="help-center--section">
                        <div className="help-center--intro">
                            <p className="account-name">
                                Xin chào,{' '}
                                <span style={{ fontWeight: 500}}>{nameHistory?.DisplayName}</span>
                            </p>
                            <p className="app-name">
                                <span>FM Plus</span> có thể giúp gì được cho
                                bạn?
                            </p>
                            <form
                                className="helper-center--form"
                                onSubmit={handleSubmit(onSubmit)}>
                                <Field
                                    name="keyword"
                                    component={RenderInput}
                                    icon={<ClearIcon />}
                                    placeholder="Đặt câu hỏi hoặc nhập từ khoá"
                                    validate={[required]}
                                />
                                <button className="helper-center--form--button">
                                    Tìm
                                </button>
                            </form>
                            <p className="note">
                                Thời gian làm việc: <span>07h30 - 22h30</span>{' '}
                                các ngày trong tuần <br />
                                (Kể cả ngày lễ)
                            </p>
                        </div>
                    </section>
                    <section className="help-center--section">
                        <CustomList list={section1} />
                    </section>
                    <section className="help-center--section">
                        <div className="help-center--section-header">
                            Hướng dẫn mua hàng
                        </div>
                        <div className="help-center--section-header toggle-custom-list">
                            <span>Hướng dẫn chọn size</span>
                            <div
                                className="custom-list--arrow"
                                style={{ width: 8 }}>
                                <ArrowRightIcon />
                            </div>
                        </div>
                        <div className="custom-list">
                            <CustomList list={section2} />
                        </div>
                    </section>
                    <section className="help-center--section">
                        <CustomList
                            header="Điều khoản & Chính sách"
                            list={sectionPolicy}
                        />
                    </section>
                    <section className="help-center--section">
                        <CustomList
                            header="Điều khoản & Chính sách"
                            list={faqs}
                        />
                    </section>
                </div>
                {/* Mobile */}
            </div>
        </div>
    );
};
export default reduxForm({ form: 'HelpCenterForm' })(HelpCenterContainer);
