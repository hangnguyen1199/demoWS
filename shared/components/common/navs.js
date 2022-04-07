const CommonNavs = (props) => {
    const {
        onPress,
        active,
        data,
        fieldName = 'Name',
        fieldValue = 'Id',
    } = props;

    const handleClick = (index) => {
        onPress(index);
    };
    return (
        <ul className="common-navs">
            {data?.map((item, index) => (
                <li
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`common-navs--item ${
                        active == index ? 'active' : ''
                    }`}>
                    {item[fieldName]}
                </li>
            ))}
        </ul>
    );
};

export default CommonNavs;
