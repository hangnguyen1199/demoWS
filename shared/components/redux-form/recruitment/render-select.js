import RangeIconUrl from '@spo/public/images/icon/ic_range.svg';
import DropdownIconUrl from '@spo/public/images/icon/ic_dropdown.svg';
import { useState } from 'react';
import MatSelect from '@spo/components/common/mat-select';

const RangeIcon = () => <img src={RangeIconUrl} />;
const DropdownIcon = () => <img src={DropdownIconUrl} />;

const RenderSelect = (props) => {
    const {
        masterData,
        placeholder,
        input,
        label,
        readonly,
        type,
        meta: { touched, error },
        maxLength,
        typeIcon = 'dropdown',
        name,
        inputIcon,
        field,
        showSearch,
        disabled,
    } = props;
    const [open, setOpen] = useState(false);
    const showError = touched && error;
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div className={`form-input--wrapper`} onClick={handleClick}>
            <div
                className={`${
                    showError && 'border-error'
                } render-input position-relative d-between flex-nowrap`}>
                <div className="w-100">
                    <label htmlFor={input?.name}>{label}</label>
                    <div className="d-center">
                        <div className="w-100 position-relative">
                            <MatSelect
                                open={open}
                                setOpen={setOpen}
                                readonly={readonly}
                                showSearch={showSearch}
                                id={input.name}
                                className=" _h_30 p-0 select-gender"
                                dropdownClass="dropdown-class"
                                {...input}
                                placeholder={placeholder}
                                data={masterData}
                                field={field}
                                defaultValue={0}
                                isShowSelectAll={false}
                                style={{ paddingLeft: 60 }}
                            />
                            {/* <select
                                    name={input.name}
                                    id={input?.name}
                                    onChange={selectChanged}
                                    className="w-100"
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    maxLength={maxLength ?? -1}>
                                    <option value="">{placeholder}</option>
                                    {masterData?.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item[fieldValue]}>
                                            {item[fieldName]}
                                        </option>
                                    ))}
                                </select> */}
                            {inputIcon && <span>input Icon</span>}
                        </div>
                    </div>
                </div>
                {typeIcon == 'dropdown' && (
                    <span>
                        <DropdownIcon />
                    </span>
                )}
                {typeIcon == 'range' && (
                    <span>
                        <RangeIcon />
                    </span>
                )}
                <div className={`error-float ${showError ? '' : 'd-none'} `}>
                    <div className="wrap _shadow1">
                        <span className="text-error">{error}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
RenderSelect.defaultProps = {
    autoComplete: true,
    placeholder: 'Nhập ...',
    type: 'text',
    maxLength: -1,
    readonly: false,
    showSearch: true,
    field: ['Value', 'Key'],
};
export default RenderSelect;
