import IconEmptyData from "./icons/icon-empty-data";

const EmptyDataComponent = (props) => {
    const { message = 'Không có dữ liệu' } = props;
    return (
        <div className="d-center text-center" style={{marginTop: 15}}>
            <div>
                <IconEmptyData />
                {message}
            </div>
        </div>
    );
};
export default EmptyDataComponent;
