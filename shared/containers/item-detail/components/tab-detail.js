import React from 'react';
import { PropTypes } from 'prop-types';

function TabDetail(props) {
    const { data } = props;
    return (
        <div className="tab-detail">
            {data.map((item, index) => {
                return (
                    <div className="wrap-row" key={index}>
                        <span className="label">{item.attribute_name}:</span>
                        <span className="content">{item.attribute_value}</span>
                    </div>
                );
            })}
        </div>
    );
}
TabDetail.propTypes = {
    data: PropTypes.array,
};
TabDetail.defaultProps = {
    data: [],
};
export default TabDetail;
