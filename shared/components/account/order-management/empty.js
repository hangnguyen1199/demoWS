import IconEmptyOrder from '../../common/icon-empty-order';

const Empty = () => {
    return (
        <div className="d-center flex-column" style={{ marginTop: 20 }}>
            <IconEmptyOrder />
            <span style={{ marginTop: 10 }}>Chưa có đơn hàng</span>
        </div>
    );
};
export default Empty;
