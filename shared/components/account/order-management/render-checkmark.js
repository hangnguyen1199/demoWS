const RenderCheckmark = (props) => {
    const { defaultValue, input } = props;
    const onChange = (e) => {
        if (e.target.checked) {
            input?.onChange(e.target.value);
        } else {
            input?.onChange(undefined);
        }
    };
    return (
        <div className="main-table-detail-input">
            <label className="container-custom-checkbox">
                <input type="checkbox" onChange={onChange} value={defaultValue} />
                <span className="checkmark"></span>
            </label>
        </div>
    );
};
export default RenderCheckmark;
