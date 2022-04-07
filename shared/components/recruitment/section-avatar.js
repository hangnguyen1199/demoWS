import { Field, reduxForm } from "redux-form";
import * as Validator from '@spo/lib/validator';
import RenderInputFile from "../redux-form/recruitment/render-input-file";

const SectionAvatar = () => {
    return (
        <div className="recruitment-form--section">
            <Field
                id="FileImage"
                label="Tải ảnh 3x4 tại đây"
                name="FileImage"
                component={RenderInputFile}
                type="text"
                validate={[Validator.required]}
            />
        </div>
    );
};
export default reduxForm({ form: 'SectionAvataForm' })(SectionAvatar);
