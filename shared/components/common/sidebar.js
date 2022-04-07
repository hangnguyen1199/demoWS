const CommonSidebar = (props) => {
    const {
        onPress,
        active,
        data,
        fieldName = 'Name',
        fieldValue = 'Id',
    } = props;
    const handleClick = (item) => {
        onPress(item[fieldValue]);
    };
    return (
        <ul className="common-sidebar">
            {data?.map((item) => (
                <li
                    onClick={() => handleClick(item)}
                    className={`common-sidebar--item ${
                        active == item[fieldValue] ? 'active' : ''
                    }`}>
                    {item[fieldName]}
                </li>
            ))}
        </ul>
    );
};

export default CommonSidebar;
