import React, { useState } from 'react';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import RenderSelect from '@spo/components/redux-form/recruitment/render-select';
import * as Validator from '@spo/lib/validator';
import CustomCheckboxRow from '@spo/components/redux-form/recruitment/custom-checkbox-row';
import { connect, useSelector } from 'react-redux';
import IconX from '../common/icon-x';
import ButtonMain from '../common/button-main';

let Section8 = (props) => {
    const {
        showButtons,
        sectionTitle,
        handleSubmit,
        handleStepActive,
        handleDataSubmit,
        CandidateForeignLanguages,
        step = 0,
    } = props;
    const { LanguageMaster, ReviewType } = useSelector((state) => state.Common);
    const [list, setList] = useState([0]);
    const handleAdd = () => {
        let newFamily = [...list];
        newFamily.push(newFamily.length);
        setList(newFamily);
    };
    const handleDelete = (index) => {
        let newFamily = [...list];
        newFamily.splice(index, 1);
        setList(newFamily);
    };
    const onSubmit = (data) => {
        data?.length > 0 &&
      data?.map((item, index) => {
          item['Language'] = Number(item['Language']);
          item['Listening'] = Number(item['Listening']);
          item['Speaking'] = Number(item['Speaking']);
          item['Reading'] = Number(item['Reading']);
          item['Writing'] = Number(item['Writing']);
      });
        handleDataSubmit(data);
        handleStepActive(9);
    };
    return (
        <div
            className={`recruitment-form--section bordered-right bordered-right--section8 ${
                step > 8 && 'active'
            }`}>
            {sectionTitle && (
                <p className="recruitment-form--section-header">{sectionTitle}</p>
            )}
            {list?.map((ls, index) => (
                <div key={index} className="recruitment-form--list--container">
                    {index > 0 && (
                        <button
                            onClick={() => handleDelete(index)}
                            className="recruitment-form--list--btn-delete">
                            <IconX color="#fff" fontSize={30} />
                        </button>
                    )}
                    <Field
                        id={`CandidateForeignLanguages[${index}][Language]`}
                        placeholder="Chọn Ngoại ngữ"
                        label="Ngoại ngữ"
                        name={`CandidateForeignLanguages[${index}][Language]`}
                        component={RenderSelect}
                        field={['Name', 'Value']}
                        type="text"
                        masterData={LanguageMaster}
                    />
                    {CandidateForeignLanguages != undefined &&
            CandidateForeignLanguages[index] != undefined &&
            CandidateForeignLanguages[index]['Language'] && (
                        <div className={`form-input--wrapper`}>
                            <div className={`render-input position-relative`}>
                                <label>Đánh giá kỹ năng</label>
                                <div className="">
                                    <div className={`w-100 position-relative`}>
                                        <div className="">
                                            <Field
                                                id={`CandidateForeignLanguages[${index}][Listening]`}
                                                rowLabel="Nghe"
                                                name={`CandidateForeignLanguages[${index}][Listening]`}
                                                component={CustomCheckboxRow}
                                                data={ReviewType}
                                                numOfColumn={3.5}
                                            />
                                            <Field
                                                id={`CandidateForeignLanguages[${index}][Speaking]`}
                                                rowLabel="Nói"
                                                name={`CandidateForeignLanguages[${index}][Speaking]`}
                                                component={CustomCheckboxRow}
                                                data={ReviewType}
                                                numOfColumn={3.5}
                                            />
                                            <Field
                                                id={`CandidateForeignLanguages[${index}][Reading]`}
                                                rowLabel="Đọc"
                                                name={`CandidateForeignLanguages[${index}][Reading]`}
                                                component={CustomCheckboxRow}
                                                data={ReviewType}
                                                numOfColumn={3.5}
                                            />
                                            <Field
                                                id={`CandidateForeignLanguages[${index}][Writing]`}
                                                rowLabel="Viết"
                                                name={`CandidateForeignLanguages[${index}][Writing]`}
                                                component={CustomCheckboxRow}
                                                data={ReviewType}
                                                numOfColumn={3.5}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <button type="button" onClick={handleAdd} className="btn-add">
        + Thêm ngoại ngữ
            </button>
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
Section8 = reduxForm({ form: 'Section8Form' })(Section8);
const selector = formValueSelector('Section8Form');
Section8 = connect((state) => {
    const CandidateForeignLanguages = selector(
        state,
        'CandidateForeignLanguages',
    );
    return {
        CandidateForeignLanguages,
    };
})(Section8);
export default Section8;
