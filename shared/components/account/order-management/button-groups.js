import constants from '@spo/config/constants';
import { React } from 'react';

const ButtonGroups = (props) => {
    const { status } = props;
    return (
        <div className="button-groups">
            {status == constants.ORDER_STATUS.FINISHED && (
                <React.Fragment>
                    <button className="btn-left">Mua lại</button>
                    <button className="btn-right">Đánh giá ngay</button>
                </React.Fragment>
            )}
        </div>
    );
};
export default ButtonGroups;
