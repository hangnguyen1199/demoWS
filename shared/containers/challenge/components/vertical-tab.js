import Link from 'next/link';

const CommonVerticalTab = (props) => {
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
        <ul className="verticalTab">
            {data?.map((item, index) => (
                // <Link href={`/challenge`} >
                <li
                    key={index}
                    onClick={() => handleClick(item)}
                    className={`verticalTab-item ${
                        active == item[fieldValue] ? "active" : ""
                    }`}
                >
                    <div className="flex-vertical-tab">
                        <span style={{ marginRight: "10px" }}>{item.Icon}</span>
                        {item[fieldName]}
                    </div>
                    <span style={{ fontWeight: "500" }}>{(item.number)}</span>
                </li>
                // </Link>
            ))}
        </ul>
    );
};

export default CommonVerticalTab;