import React from 'react';
import PropTypes from 'prop-types';
import constants from '@spo/config/constants';
import Currency from 'react-currency-formatter';

const Price = props => {
    const { showSymbolSub = false } = props
    return (
        props.typeView !== constants.TYPE_VIEW_ITEM.LIST ?
            <div className={`${props?.className} product-price `}>
                {
                    (props.oldPrice > 0 && props.oldPrice != props.price) &&
					<>
					    <span className="old-price">
					        <Currency
					            quantity={props.oldPrice}
					            currency="VND"
					            pattern="##,### !"
					            symbol=""
					        />
					    </span>
					    <>
					        {
					            showSymbolSub && <span className="currency tag_old_price">VND</span>
					        }
					    </>
					</>
                }

                <span className="price">
                    <Currency
                        quantity={props.price}
                        currency="VND"
                        pattern="##,### !"
                        symbol=""
                    />
                </span>
                <span className="currency fontsize9">VND</span>
            </div>
            :
            <p className="product-price grid-view-item__meta">
                {
                    (props.oldPrice > 0 && props.oldPrice != props.price) &&
					<span className="old-price">
					    <Currency
					        quantity={props.oldPrice}
					        currency="VND"
					        pattern="##,### !"
					        symbol=""
					    />
					    <span className="currency fontsize9">VND</span>
					</span>
                }
                <span className="product-price__price product-price__sale">
                    <span className="money">
                        <Currency
                            quantity={props.price}
                            currency="VND"
                            pattern="##,### !"
                            symbol=""
                        />
                        <span className="currency fontsize9">VND</span>
                    </span>
                </span>
            </p>
    );
};

Price.propTypes = {
    typeView: PropTypes.string,
    oldPrice: PropTypes.number,
    price: PropTypes.number
}

Price.defaultProps = {
    typeView: constants.TYPE_VIEW_ITEM.GRID,
    oldPrice: 0,
    price: 0
}

export default Price;