import React from 'react';
import PropTypes from 'prop-types';
import Currency from 'react-currency-formatter';

const RemainingSold = (props) => {
    return (
        <div className="sold_remaining">
            <div>
                Còn lại:{' '}
                <Currency
                    quantity={props.remaining}
                    currency="VND"
                    pattern="##,### !"
                    symbol=""
                />
            </div>
            {/* <div style={{ width: 25, textAlign: 'center' }}>|</div> */}
            {/* <div>Đã bán: {props.sold}</div> */}
            {/* <div>
                Đã bán:{' '}
                <Currency
                    quantity={props.sold}
                    currency="VND"
                    pattern="##,### !"
                    symbol=""
                />
            </div> */}
        </div>
    );
};

RemainingSold.propTypes = {
    remaining: PropTypes.number,
    sold: PropTypes.number,
};

RemainingSold.defaultProps = {
    remaining: 0,
    sold: 0,
};

export default RemainingSold;
