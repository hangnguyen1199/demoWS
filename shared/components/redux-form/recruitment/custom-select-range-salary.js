import RangeIconUrl from '@spo/public/images/icon/ic_range.svg';
import DropdownIconUrl from '@spo/public/images/icon/ic_dropdown.svg';

const RangeIcon = () => <img src={RangeIconUrl} />;
const DropdownIcon = () => <img src={DropdownIconUrl} />;

const CustomSelectRangeSalary = (props) => {
    const {
        placeholder,
        input,
        label,
        type,
        meta: { touched, error },
        maxLength,
        typeIcon='dropdown',
        name,
        inputIcon,
    } = props;
    const showError = touched && error;
    return (
        <div className={`form-input--wrapper`}>
            <div
                className={`${
                    showError && 'border-error'
                } render-input position-relative d-between flex-nowrap`}>
                <div className="w-100">
                    <label htmlFor={input?.name}>{label}</label>
                    <div className="d-center">
                        <div className="w-100 position-relative">
                            <div className="d-center">
                                <select
                                    {...input}
                                    id={input?.name}
                                    className="w-100"
                                    placeholder={placeholder}
                                    maxLength={maxLength ?? -1}>
                                    <option value={undefined}>
                                        {placeholder}
                                    </option>
                                    <option>1</option>
                                    <option>3</option>
                                    <option>2</option>
                                </select>
                                {inputIcon && <span>input Icon</span>}
                            </div>
                        </div>
                    </div>
                </div>
                {typeIcon == 'dropdown' && <span><DropdownIcon/></span>}
                {typeIcon == 'range' && <span><RangeIcon/></span>}
                <div className={`error-float ${showError ? '' : 'd-none'} `}>
                    <div className="wrap _shadow1">
                        <span className="text-error">{error}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenderSelect;
