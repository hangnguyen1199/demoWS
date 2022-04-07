const CommonVerticalTabIpad = (props) => {
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
        <ul className="verticalTab-ipad">
            {data?.map((item,index) => (
                <li
                    key={index}
                    onClick={() => handleClick(item)}
                    className={`verticalTab-item ${
                        active == item[fieldValue] ? "active" : ""
                    }`}
                >
                    <div className="flex-vertical-tab">
                        <span style={{marginRight:'10px'}}>{item.Icon}</span>
                        {item[fieldName]}
                    </div>
                    <span style={{fontWeight:'500'}}>{(item.number)}</span>
                </li>
            ))}
        </ul>
    );
};
  
export default CommonVerticalTabIpad;
