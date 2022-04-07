import { Field } from 'redux-form';
import CustomCheckboxConfirm from '../redux-form/recruitment/custom-checkbox-confirm';
import * as Validator from '@spo/lib/validator';

const confirmCheckbox = {
    Label: undefined,
    Name: 'Confirm',
    Data: [
        {
            Name: (
                <div
                    style={{
                        fontStyle: 'italic',
                        fontWeight: 400,
                        paddingLeft: 15,
                        fontSize: 14,
                    }}>
                    <p>
            Tôi xin cam đoan những thông tin đã khai là chính xác & đúng sự
            thật. Tôi đồng ý cho
                        <span style={{ marginLeft: 5, color: '#FF2C00' }}>FM</span> xác mình
            những thông tin trên. Nếu có bất kỳ thông tin nào sai lệch, tôi sẽ
            hoàn toàn chịu trách nhiệm.
                    </p>
                    <p>
            Trong trường hợp được{' '}
                        <span style={{ marginLeft: 5, color: '#FF2C00' }}>FM</span> lựa
            chọn, tôi xin cam kết tuân thủ đúng & đầy đủ các quy định tại{' '}
                        <span style={{ marginLeft: 5, color: '#FF2C00' }}>FM</span>. Nếu vi
            phẩm, tôi đồng ý chịu trách nhiệm & bị xử lý theo quy định của{' '}
                        <span style={{ marginLeft: 5, color: '#FF2C00' }}>FM</span>.
                    </p>
                </div>
            ),
            Value: 'Y',
        },
    ],
};

const SectionConfirm = () => {
    return (
        <div className="recruitment-form--section">
            <Field
                component={CustomCheckboxConfirm}
                id="confirm"
                name="confirm"
                data={confirmCheckbox}
                numOfColumn={1}
                validate={[Validator.required]}
            />
        </div>
    );
};

export default SectionConfirm;
