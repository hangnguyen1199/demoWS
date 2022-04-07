import React, { useEffect, useState } from 'react';

function FilterReview(props) {
    const { data } = props;
    const [filter, setFilter] = useState('all');
    function handleFilter(e) {
        props.onChange(e);
        setFilter(e);
    }
    return (
        <div className="d-row d-start">
            <div className="col-md-2 col-4 mb-2 px-0 pr-2" onClick={() => handleFilter('total-happy')}>
                <div className={`d-center review-filter ${filter == 'total-happy' ? 'active' : ''}`} >
                    <span className="pr-2"><img style={{ width: 30, height: 31 }} src="/images/icon/review-happy.svg" /></span>
                    <span>({data.TotalRateGood})</span>
                </div>
            </div>
            <div className="col-md-2 col-4 mb-2 px-0 pr-2" onClick={() => handleFilter('total-normal')}>
                <div className={`d-center review-filter ${filter == 'total-normal' ? 'active' : ''}`} >
                    <span className="pr-2"><img style={{ width: 30, height: 31 }} src="/images/icon/review-normal.svg" /></span>
                    <span>({data.TotalRateNormal})</span>
                </div>
            </div>
            <div className="col-md-2 col-4 mb-2 px-0 pr-2" onClick={() => handleFilter('total-bad')}>
                <div className={`d-center review-filter ${filter == 'total-bad' ? 'active' : ''}`} >
                    <span className="pr-2"><img style={{ width: 31, height: 31 }} src="/images/icon/review-bad.svg" /></span>
                    <span>({data.TotalRateBad})</span>
                </div>
            </div>
            <div className="col-md-2 col-4 mb-2 px-0 pr-2" onClick={() => handleFilter('have-comment')}>
                <div className={`d-center review-filter flex-column ${filter == 'have-comment' ? 'active' : ''}`} >
                    <span className="text-truncate px-1 w-100 text-center">Có bình luận</span>
                    <span>({data.TotalHaveComment})</span>
                </div>
            </div>
            <div className="col-md-2 col-4 mb-2 px-0 pr-2" onClick={() => handleFilter('have-image')}>
                <div className={`d-center review-filter  flex-column ${filter == 'have-image' ? 'active' : ''}`}>
                    <span className="text-truncate px-1 w-100 text-center">Có hình ảnh /video</span>
                    <span>({data.TotalHaveImage})</span>
                </div>
            </div>
            <div className="col-md-2 col-4 mb-2 px-0" onClick={() => handleFilter('all')}>
                <div className={`d-center review-filter flex-column ${filter == 'all' ? 'active' : ''}`}>
                    <span className="text-truncate px-1 w-100 text-center">Tất cả</span>
                    <span>({data.TotalHaveImage})</span>
                </div>
            </div>
        </div>
    );
}
FilterReview.propTypes = {
};
FilterReview.defaultProps = {
};
export default FilterReview;
