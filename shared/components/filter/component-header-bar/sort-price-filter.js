import React from 'react'
import IconCheck from '../../common/icon-check';
import PropTypes, { string } from 'prop-types';

function SortPriceFilter(props) {
    const { handleSortPrice, dataFilter } = props;
    return (
        <>
            <div className='column-menu-modal'>
                <div className='menu-modal-column'>
                    <p className='menu-name'>SẮP XẾP THEO</p>
                    <div onClick={() => handleSortPrice('price_desc')} className='d-flex flex-row align-items-center menu-modal-column-item'>
                        <span className="icon-check-left">
                            {dataFilter === 'price_desc' && <IconCheck />}
                        </span>
                        <p className={`fontsize16 menu-name-item ${dataFilter === 'price_desc' ? 'active' : ''}`}>Giá từ cao đến thấp</p>
                    </div>
                    <div onClick={() => handleSortPrice('price_asc')} className='d-flex flex-row align-items-center menu-modal-column-item'>
                        <span className="icon-check-left">
                            {dataFilter === 'price_asc' && <IconCheck />}
                        </span>
                        <p className={`fontsize16 menu-name-item ${dataFilter === 'price_asc' ? 'active' : ''}`}>Giá từ thấp đến cao</p>
                    </div>
                </div>
            </div>
        </>
    )
}


SortPriceFilter.propTypes = {
    handleSortPrice: PropTypes.func,
    dataFilter: string
}
export default SortPriceFilter;