import RangeIconUrl from '@spo/public/images/icon/ic_range.svg';
import DropdownIconUrl from '@spo/public/images/icon/ic_dropdown.svg';

const RangeIcon = () => <img src={RangeIconUrl} />;
const DropdownIcon = () => <img src={DropdownIconUrl} />;

const CustomSelect = (props) => {
    const {
        placeholder,
        input,
        meta: { touched, error },
        maxLength,
        inputIcon,
        style,
    } = props;

    const onChange = (e) => {
        input?.onChange(e.target.value);
    };
    return (
        <React.Fragment>
            <div style={style} className="d-center">
                <div className="w-100 position-relative">
                    <div className="d-center">
                        <select
                            style={{
                                paddingRight: 5,
                                paddingLeft: 5,
                            }}
                            {...input}
                            id={input?.name}
                            className="w-100"
                            placeholder={placeholder}
                            onChange={onChange}
                            maxLength={maxLength ?? -1}>
                            {placeholder && (
                                <option value={undefined}>{placeholder}</option>
                            )}
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                        {inputIcon && <span>{inputIcon}</span>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CustomSelect;
