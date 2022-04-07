import AddIconUrl from '@spo/public/images/icon/ic_add.svg';
import { useState } from 'react';
import IconPlus from '@spo/components/common/icon-plus';

const RenderInputFile = (props) => {
    const {
        label,
        input,
        meta: { touched, error },
    } = props;
    const [file, setFile] = useState();
    const handleChange = (e) => {
        if(e.target.files[0]){
            setFile(e.target.files[0]);
            input?.onChange(e.target.files[0]);
        }else{
            input?.onChange(file);
        }
    };
    const showError = touched && error;
    return (
        <div className="form-input--wrapper">
            <div className="form-input-file--wrapper">
                <label htmlFor="avatar-file"
                    className={`form-input-file ${
                        showError && 'border-error'
                    }`}>
                    <input
                        name={input?.name}
                        onChange={handleChange}
                        className="d-none"
                        id="avatar-file"
                        accept="image/*"
                        type="file"
                        multiple={false}
                    />
                    <div
                        className="d-center flex-column"
                        style={{ position: 'relative', zIndex: 2 }}>
                        <IconPlus fontSize={50} />
                        <p>{label}</p>
                    </div>
                    {file && (
                        <img
                            className="preview-file"
                            src={URL.createObjectURL(file)}
                        />
                    )}
                    <div className={`error-float ${showError ? '' : 'd-none'} `}>
                        <div className="wrap _shadow1">
                            <span className="text-error">{error}</span>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};
export default RenderInputFile;
