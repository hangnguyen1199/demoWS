import React from 'react'
import PriceFilter from '@spo/components/filter/price-filter';
import PropTypes from 'prop-types';

function PriceFilters(props) {
    const { onChangePrice, dataFilter } = props;
    return (
        <>
            <div style={{ marginRight: 15 }} className='column-menu-modal'>
                <div className='menu-modal-column'>
                    <p className='menu-name'>GIÁ</p>
                    <div className='d-flex flex-row align-items-center menu-modal-column-item ml-3'>
                        <PriceFilter
                            min={0}
                            max={1000000}
                            onChange={(e) =>
                                onChangePrice(e)
                            }
                            defaultValueStart={Number(dataFilter.startPrice)}
                            defaultValueEnd={Number(dataFilter.endPrice)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

PriceFilters.propTypes={
    onChangePrice:PropTypes.func,
    dataFilter:PropTypes.shape()
}

export default  PriceFilters;