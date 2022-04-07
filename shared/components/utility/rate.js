import React from 'react';
import PropTypes from 'prop-types';

const Rate = props => {
    const createStar = () => {
        let max = 5;
        let star = [];
        if (props.rate < 5) {
            max = props.rate;
        }
        for (let i = 0; i < max; i++) {
            star.push(<i className="font-13 fa fa-star" key={i}></i>);
        }
        for (let i = max; i < 5; i++) {
            star.push(<i className="font-13 fa fa-star-o" key={i}></i>);
        }
        return star;
    };
    return (
        <div className="product-review">
            {createStar()}
        </div>
    );
};

Rate.propTypes = {
    rate: PropTypes.number
}

Rate.defaultProps = {
    rate: 0
}

export default Rate;