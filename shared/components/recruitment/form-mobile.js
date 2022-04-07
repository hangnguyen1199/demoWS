import React, { useState } from 'react';
import SectionAvatar from '@spo/components/recruitment/section-avatar';
import Section0 from '@spo/components/recruitment/section0';
import Section1 from '@spo/components/recruitment/section1';
import Section2 from '@spo/components/recruitment/section2';
import Section3 from '@spo/components/recruitment/section3';
import Section4 from '@spo/components/recruitment/section4';
import Section5 from '@spo/components/recruitment/section5';
import Section6 from '@spo/components/recruitment/section6';
import Section7 from '@spo/components/recruitment/section7';
import Section8 from '@spo/components/recruitment/section8';
import Section9 from '@spo/components/recruitment/section9';
import Section10 from '@spo/components/recruitment/section10';
import Section11 from '@spo/components/recruitment/section11';
import Section12 from '@spo/components/recruitment/section12';
import Section13 from '@spo/components/recruitment/section13';
import SectionConfirm from './section-confirm';
import { formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ButtonMain from '../common/button-main';

let FormRecruitmentMobile = (props) => {
    const { handleSubmit, handleFormSubmit } = props;
    const [stepActive, setStepActive] = useState(1);
    const [dataSubmit, setDataSubmit] = useState({});
    const handleStepActive = (step) => {
        setStepActive(step);
    };
    const handleDataSubmit = (data) => {
        setDataSubmit({ ...dataSubmit, ...data });
    };
    const onSubmit = async (data) => {
        let infoData = { ...dataSubmit, ...data };
        handleFormSubmit(infoData);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 80 }}>
            {/* <SectionAvatar />
            <Section0 /> */}
            <Section1
                handleStepActive={handleStepActive}
                sectionTitle={
                    <span>
                        1. Thông tin cá nhân
                        <span className="text-required">*</span>
                    </span>
                }
                showButtons={true}
                handleDataSubmit={handleDataSubmit}
            />
            {stepActive >= 2 && (
                <Section2
                    numOfColumn={2}
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>
                            2. Được biết thông tin tuyển dụng qua{' '}
                            <span className="text-required">*</span>
                        </span>
                    }
                    showButtons={true}
                />
            )}
            {stepActive >= 3 && (
                <Section3
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>
                            3. Thông tin gia đình
                            <span className="text-required">*</span>
                            <span className="note">
                                (Bố, mẹ, vợ, chồng, con cái, anh, chị, em ruột)
                            </span>
                        </span>
                    }
                    showButtons={true}
                />
            )}
            {stepActive >= 4 && (
                <Section4
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>
                            4. Tự nhận xét bản thân
                            <span className="text-required">*</span>
                        </span>
                    }
                    showButtons={true}
                />
            )}
            {stepActive >= 5 && (
                <Section5
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={<span>5.Trình độ học vấn</span>}
                    showButtons={true}
                />
            )}
            {stepActive >= 6 && (
                <Section6
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>6. Các khoá huấn luyện, đào tạo khác</span>
                    }
                    showButtons={true}
                />
            )}
            {stepActive >= 7 && (
                <Section7
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle="7. Các thành tích nổi bật đã đạt được"
                    showButtons={true}
                />
            )}
            {stepActive >= 8 && (
                <Section8
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle="8. Trình độ ngôn ngữ"
                    showButtons={true}
                />
            )}
            {stepActive >= 9 && (
                <Section9
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle="9. Kỹ năng tin học"
                    showButtons={true}
                />
            )}
            {stepActive >= 10 && (
                <Section10
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle="10. Phẩm chất & Kỹ năng đặc biệt"
                    showButtons={true}
                />
            )}
            {stepActive >= 11 && (
                <Section11
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>
                            11. Quá trình công tác
                            <span className="note">
                                (Bắt đầu từ công việc gần đây nhất)
                            </span>
                        </span>
                    }
                    showButtons={true}
                />
            )}
            {stepActive >= 12 && (
                <Section12
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle="12. Họ và tên người tham chiếu"
                    showButtons={true}
                />
            )}
            {stepActive >= 13 && (
                <Section13
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>
                            13. Thông tin khác
                            <span className="text-required">*</span>
                        </span>
                    }
                    showButtons={true}
                />
            )}
            {stepActive >= 14 && (
                <SectionConfirm handleDataSubmit={handleDataSubmit} />
            )}
            {stepActive >= 14 && (
                <ButtonMain
                    title="Hoàn thành"
                    className="btn-submit"
                    type="submit"
                />
            )}
        </form>
    );
};

FormRecruitmentMobile = reduxForm({
    form: 'FormRecruitment',
    enableReinitialize: true,
})(FormRecruitmentMobile);
export default FormRecruitmentMobile;
