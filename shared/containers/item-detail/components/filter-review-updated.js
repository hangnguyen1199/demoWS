import React, { useEffect, useState } from 'react';
import IconNormal from '../../../components/common/icons/icon-normal';
import IconSad from '../../../components/common/icons/icon-sad';
import IcconSmile from '../../../components/common/icons/icon-smile';
import SelectBox from '../../../components/common/select-box';
import Display from '../../../components/common/display';


function FilterReviewUpdated (props) {
    const { data } = props;
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState(null)
    function handleFilter (e,  _event) {
        // console.log("_event", )
        props.onChange({
            Type: e,
            Sort: sortBy
        });
        setFilter(e);
        let _this = $(_event.target)
        let pos=_this.position().left; 
        let currentscroll=$(".tab-title-list").scrollLeft(); 
        let divwidth=$(".tab-title-list").width(); 
        pos=(pos+currentscroll)-(divwidth/2);
          
        $('.tab-title-list').animate({
            scrollLeft: pos
        });
    }
    const handleChangeSort = (e) => {
        props.onChange({
            Type: filter,
            Sort: e
        });
        setSortBy(e);
    }

    
    // useEffect(()=>{
    //     $('.tab-title-list .wrap_tab_title').on('click',function(){
    //         let pos=$(this).position().left; 
    //         let currentscroll=$(".tab-title-list").scrollLeft(); 
    //         let divwidth=$(".tab-title-list").width(); 
    //         pos=(pos+currentscroll)-(divwidth/2);
          
    //         $('.tab-title-list').animate({
    //             scrollLeft: pos
    //         });
          
    //     });
    // },[])    
    return (
        <>
            <Display mobile={true}>
                <div className="d-row d-between mb-3">
                    <span className="textSort">Sắp xếp theo</span>
                    <div className='wrapSortReview'>
                        <SelectBox
                            value={sortBy}
                            showArrow={true}
                            className="select_box_skin1 sortReview"
                            list={[{
                                label: "Mới nhất",
                                value: 1
                            }, {
                                label: "Cũ nhất",
                                value: 2
                            }]}
                            onChange={handleChangeSort}
                        />
                    </div>
                </div>
            </Display>
            <div className="filter_review_updated d-row d-between tab-title-list">

                <div className="d-row d-start flex-nowrap">
                    <div className="wrap_tab_title" onClick={(e) => handleFilter('all',e)}>
                        <div className={`tab_title ${filter == 'all' ? 'active' : ''}`}>
                            <span className="text-truncate px-1 w-100 text-center">Tất cả</span>
                            <span>({data.TotalReview})</span>
                        </div>
                    </div>
                    <div className="wrap_tab_title pr-2" onClick={(e) => handleFilter('have-image',e)}>
                        <div className={`tab_title ${filter == 'have-image' ? 'active' : ''}`}>
                            <span className="text-truncate px-1 w-100 text-center">Có hình ảnh /video</span>
                            <span>({data.TotalHaveImage})</span>
                        </div>
                    </div>
                    <div className="wrap_tab_title pr-2" onClick={(e) => handleFilter('have-comment',e)}>
                        <div className={`tab_title ${filter == 'have-comment' ? 'active' : ''}`} >
                            <span className="text-truncate px-1 w-100 text-center">Có bình luận</span>
                            <span>({data.TotalHaveComment})</span>
                        </div>
                    </div>
                    <div className="wrap_tab_title pr-2" onClick={(e) => handleFilter('total-happy',e)}>
                        <div className={`d-center tab_title ${filter == 'total-happy' ? 'active' : ''}`} >
                            <span className="pr-2">
                                <IcconSmile fontSize={30} />
                            </span>
                            <span>({data.TotalRateGood})</span>
                        </div>
                    </div>
                    <div className="wrap_tab_title pr-2" onClick={(e) => handleFilter('total-normal', e)}>
                        <div className={`d-center tab_title ${filter == 'total-normal' ? 'active' : ''}`} >
                            <span className="pr-2"><IconNormal fontSize={30} /></span>
                            <span>({data.TotalRateNormal})</span>
                        </div>
                    </div>
                    <div className="wrap_tab_title pr-2" onClick={(e) => handleFilter('total-bad', e)}>
                        <div className={`d-center tab_title ${filter == 'total-bad' ? 'active' : ''}`} >
                            <span className="pr-2"><IconSad fontSize={30} /></span>
                            <span>({data.TotalRateBad})</span>
                        </div>
                    </div>
                </div>
                <Display>
                    <div className="d-row d-start">
                        <span className="textSort">Sắp xếp theo</span>
                        <div className='wrapSortReview'>
                            <SelectBox
                                value={sortBy}
                                showArrow={true}
                                className="select_box_skin1 sortReview"
                                list={[{
                                    label: "Mới nhất",
                                    value: 1
                                }, {
                                    label: "Cũ nhất",
                                    value: 2
                                }]}
                                onChange={handleChangeSort}
                            />
                        </div>
                    </div>
                </Display>
            </div>
        </>
    );
}
FilterReviewUpdated.propTypes = {
};
FilterReviewUpdated.defaultProps = {
};
export default FilterReviewUpdated;
