const CommonVerticalTabMobile = (props) => {
    const {
        onPress,
        active,
        data,
        fieldName = "Name",
        fieldValue = "Id",
        dataNumber
    } = props;
    const handleClick = (item) => {
        onPress(item[fieldValue]);
    };
    return (
        <ul className="vertical-tab-mobi">
            {data?.map((item,index) => (
                <li
                    key={index}
                    onClick={() => handleClick(item)}
                    className={`vertical-tab-mobi-item ${
                        active == item[fieldValue] ? "active" : ""
                    }`}
                >
                    <div style={{height:"70px"}} className="flex-vertical-tab">
                        <span style={{marginRight:'10px'}}>{item.Icon}</span>
                        <span>{item[fieldName]}</span>
                    </div>
                    <span style={{fontWeight:'500'}}>{(item.number)}</span>
                </li>
            ))}
        </ul>
    );
};
export default CommonVerticalTabMobile;
