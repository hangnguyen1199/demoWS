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

let FormRecruitmentDesktop = (props) => {
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
        // console.log(infoData);
        handleFormSubmit(infoData);
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="form__container--desktop">
            {/* <div className="row justify-content-between">
        <div className="col-12 col-md-6">
          <SectionAvatar   />
        </div>
        <div className="col-12 col-md-6">
          <Section0   />
        </div>
      </div> */}
            <Section1
                handleStepActive={handleStepActive}
                sectionTitle={
                    <span>
            Thông tin cá nhân
                        <span className="text-required">*</span>
                    </span>
                }
                showButtons={true}
                handleDataSubmit={handleDataSubmit}
                step={stepActive}
            />
            {stepActive >= 2 && (
                <Section2
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>
              Được biết thông tin tuyển dụng qua{' '}
                            <span className="text-required">*</span>
                        </span>
                    }
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 3 && (
                <Section3
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>
              Thông tin gia đình
                            <span className="text-required">*</span>
                            <span className="note">
                (Bố, mẹ, vợ, chồng, con cái, anh, chị, em ruột)
                            </span>
                        </span>
                    }
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 4 && (
                <Section4
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>
              Tự nhận xét bản thân
                            <span className="text-required">*</span>
                        </span>
                    }
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 5 && (
                <Section5
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={<span>Trình độ học vấn</span>}
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 6 && (
                <Section6
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={<span>Các khoá huấn luyện, đào tạo khác</span>}
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 7 && (
                <Section7
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle="Các thành tích nổi bật đã đạt được"
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 8 && (
                <Section8
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle="Trình độ ngôn ngữ"
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 9 && (
                <Section9
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle="Kỹ năng tin học"
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 10 && (
                <Section10
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle="Phẩm chất & Kỹ năng đặc biệt"
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 11 && (
                <Section11
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>
              11. Quá trình công tác
                            <span className="note">(Bắt đầu từ công việc gần đây nhất)</span>
                        </span>
                    }
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 12 && (
                <Section12
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle="Họ và tên người tham chiếu"
                    showButtons={true}
                    step={stepActive}
                />
            )}
            {stepActive >= 13 && (
                <Section13
                    handleDataSubmit={handleDataSubmit}
                    handleStepActive={handleStepActive}
                    sectionTitle={
                        <span>
              Thông tin khác
                            <span className="text-required">*</span>
                        </span>
                    }
                    showButtons={false}
                />
            )}
            {stepActive >= 13 && (
                <SectionConfirm handleDataSubmit={handleDataSubmit} />
            )}
            {stepActive >= 13 && (
                <div className="recruitment-form--section">
                    <ButtonMain
                        title="Hoàn thành"
                        className="btn-submit"
                        type="submit"
                    />
                </div>
            )}
        </form>
    );
};
FormRecruitmentDesktop = reduxForm({
    form: 'FormRecruitment',
    enableReinitialize: true,
})(FormRecruitmentDesktop);
export default FormRecruitmentDesktop;
