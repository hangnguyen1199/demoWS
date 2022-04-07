import React from 'react';
import PropTypes from 'prop-types';

const Live = (props) => {
    return (
        <div className="live-item pointer">
            <div className="livestream-info d-flex">
                <div className="livestream-icon">
                    LIVE
                </div>
                <div className="livestream-count">
                    <img src="/images/icon/icon-md-eye.svg" style={{marginRight: 3}} /> 2.000
                </div>
            </div>
            <img style={{width: '100%', height: '100%'}} src="https://fm.com.vn//images/products/792290_960689321_z2824242656533_71cd41212527bdc36b6cdf7ab711bb62.jpg" />
            <div className="livestream-content">
                Sale đồng giá áo khoác mùa đông 100.000 VND săn sale ngay tại livestream
            </div>
        </div>
    );
};

Live.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    moreInfor: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
};

Live.defaultProps = {
    id: 0,
    name: '',
    moreInfor: '',
    image: '',
};

export default Live;
