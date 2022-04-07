import React, { useState } from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import RenderDatePicker from '@spo/components/redux-form/recruitment/render-datepicker';
import RenderInput from '@spo/components/redux-form/recruitment/render-input';
import RenderSelect from '@spo/components/redux-form/recruitment/render-select';
import * as Validator from '@spo/lib/validator';
import RenderCheckbox from '@spo/components/redux-form/recruitment/render-checkbox';
import { connect, useSelector } from 'react-redux';
import ButtonMain from '../common/button-main';

let Section13 = (props) => {
    const {
        showButtons,
        sectionTitle,
        handleSubmit,
        handleStepActive,
        handleDataSubmit,
        AcquaintanceTypeRelationship,
        AcquaintanceTypeWorked,
    } = props;
    const { YesNoMaster, YesNo2Master } = useSelector((state) => state.Common);
    const onSubmit = (data) => {
        handleDataSubmit(data);
        handleStepActive(14);
    };
    return (
        <div className="recruitment-form--section bordered-right bordered-right--section13">
            {sectionTitle && (
                <p className="recruitment-form--section-header">
                    {sectionTitle}
                </p>
            )}
            <Field
                id="AcquaintanceTypeRelationship"
                label={
                    <span>
                        Anh/chị có quen biết ai đang làm việc tại{' '}
                        <span style={{ color: '#FF2C00' }}>FM</span> không ?
                    </span>
                }
                name="AcquaintanceTypeRelationship"
                component={RenderCheckbox}
                masterData={YesNoMaster}
                validate={[Validator.required]}
            />
            {AcquaintanceTypeRelationship == 1 && (
                <React.Fragment>
                    <Field
                        id="AcquaintancePersonAtFM"
                        label="Họ & Tên người quen biết"
                        placeholder="Nhập Họ & Tên người quen biết"
                        name="AcquaintancePersonAtFM"
                        component={RenderInput}
                        type="text"
                        validate={[Validator.required]}
                    />
                    <Field
                        id="AcquaintanceType"
                        label="Mối quan hệ với người quen biết"
                        placeholder="Nhập mối quan hệ với người quen biết"
                        name="AcquaintanceType"
                        component={RenderInput}
                        type="text"
                        validate={[Validator.required]}
                    />
                </React.Fragment>
            )}
            <Field
                id="AcquaintanceTypeWorked"
                label={
                    <span>
                        Anh/Chị trước đó đã từng làm việc tại{' '}
                        <span style={{ color: '#FF2C00' }}>FM</span> chưa ?
                    </span>
                }
                name="AcquaintanceTypeWorked"
                component={RenderCheckbox}
                masterData={YesNo2Master}
                validate={[Validator.required]}
            />
            {AcquaintanceTypeWorked == 2 && (
                <React.Fragment>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}>
                        <div style={{ width: '50%', paddingRight: 5 }}>
                            <Field
                                id="TimeStartedAtFM"
                                label="Thời gian bắt đầu"
                                name="TimeStartedAtFM"
                                component={RenderDatePicker}
                                validate={[
                                    Validator.required,
                                    Validator.validateMinDate,
                                ]}
                            />
                        </div>
                        <div style={{ width: '50%', paddingLeft: 5 }}>
                            <Field
                                id="TimeEndedAtFM"
                                label="Thời gian kết thúc"
                                name="TimeEndedAtFM"
                                component={RenderDatePicker}
                                validate={[
                                    Validator.required,
                                    Validator.validateMinDate,
                                    Validator.validateTimeAtFMS13,
                                ]}
                            />
                        </div>
                    </div>
                    <Field
                        id="PositionInPast"
                        label="Vị trí công việc"
                        placeholder="Nhập vị trí công việc"
                        name="PositionInPast"
                        component={RenderInput}
                        type="text"
                        validate={[Validator.required]}
                    />
                    <Field
                        id="ReasonLeavingFM"
                        label="Lý do nghỉ việc"
                        placeholder="Nhập lý do nghỉ việc"
                        name="ReasonLeavingFM"
                        component={RenderInput}
                        type="text"
                        validate={[Validator.required]}
                    />
                </React.Fragment>
            )}
            <Field
                id="ReasonApplying"
                label="Tại sao anh/chị muốn làm việc tại FM?"
                placeholder="Trả lời"
                name="ReasonApplying"
                component={RenderInput}
                type="text"
                validate={[Validator.required]}
            />
            <Field
                id="Todo"
                label="Anh/chị có thể làm được gì cho FM?"
                placeholder="Trả lời"
                name="Todo"
                component={RenderInput}
                type="text"
                validate={[Validator.required]}
            />
            {showButtons && (
                <ButtonMain
                    title="Tiếp tục"
                    className="btn-recruitment--continue"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
            />
            )}
        </div>
    );
};
Section13 = reduxForm({ form: 'Section13Form' })(Section13);
const selector = formValueSelector('Section13Form');
Section13 = connect((state) => {
    const AcquaintanceTypeRelationship = selector(
        state,
        'AcquaintanceTypeRelationship',
    );
    const AcquaintanceTypeWorked = selector(state, 'AcquaintanceTypeWorked');
    return { AcquaintanceTypeRelationship, AcquaintanceTypeWorked };
})(Section13);
export default Section13;
