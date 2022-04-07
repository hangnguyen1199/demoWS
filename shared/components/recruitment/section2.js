import { Field, reduxForm, formValueSelector } from 'redux-form';
import CustomCheckboxRow from '@spo/components/redux-form/recruitment/custom-checkbox-row';
import * as Validator from '@spo/lib/validator';
import { useSelector, connect } from 'react-redux';
import CustomInput from '@spo/components/redux-form/recruitment/custom-input';
import ButtonMain from '../common/button-main';

let Section2 = (props) => {
    const {
        showButtons,
        handleDataSubmit,
        sectionTitle = '',
        handleSubmit,
        handleStepActive,
        TakeRecruitmentInfoBy,
        numOfColumn = 3,
        step = 0,
    } = props;
    const { SocialMaster } = useSelector((state) => state.Common);
    const onSubmit = (data) => {
        handleDataSubmit(data);
        handleStepActive(3);
    };
    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section2 ${
                step > 2 && 'active'
            }`}>
            {sectionTitle && (
                <p className="recruitment-form--section-header">{sectionTitle}</p>
            )}
            <div className={`form-input--wrapper`}>
                <div className={`render-input position-relative`}>
                    <label>Anh/Chị biết thông tin tuyển dụng thông qua</label>
                    <div className="">
                        <div className={`w-100 position-relative`}>
                            <div className="">
                                <Field
                                    id="TakeRecruitmentInfoBy"
                                    name="TakeRecruitmentInfoBy"
                                    component={CustomCheckboxRow}
                                    data={SocialMaster}
                                    numOfColumn={numOfColumn}
                                    validate={[Validator.required]}
                                />
                                <div className="other-input">
                                    <Field
                                        id="TakeRecruitmentInfoByOther"
                                        name="TakeRecruitmentInfoByOther"
                                        placeholder="Trả lời"
                                        type="text"
                                        component={CustomInput}
                                        style={{
                                            display: 'unset !important',
                                        }}
                                        validate={[Validator.requiredByTakenValue6]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div
                className={`error-float ${
                    showError ? '' : 'd-none'
                } `}>
                <div className="wrap _shadow1">
                    <span className="text-error">{error}</span>
                </div>
            </div> */}
                </div>
            </div>
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
Section2 = reduxForm({ form: 'Section2Form' })(Section2);
const selector = formValueSelector('Section2Form');
Section2 = connect((state) => {
    const TakeRecruitmentInfoBy = selector(state, 'TakeRecruitmentInfoBy');
    return { TakeRecruitmentInfoBy };
})(Section2);
export default Section2;
