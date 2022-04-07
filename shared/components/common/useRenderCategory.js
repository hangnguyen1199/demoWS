import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IconChevronRight from './icon-chevron-right';

let groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
export default function useRenderCategory(category_id) {
    const data = useSelector((state) => state.Common.data.listCategory);
    const list = groupBy(data, 'parent_id');
    
    // const child_categories = data.map((data, index) => 
    // data.child_categories.map((data) => data.category_id)
    // )
    // console.log(child_categories)
    const renderCategoryLink = () => {
        const [child, setChild] = useState();
        const [parentId, setParentId] = useState();
        const [parent, setParent] = useState();
        // let child = data[data.findIndex((x) => x?.category_id == category_id)];
        // let parent =
        //     data[data.findIndex((x) => x?.category_id == child?.parent_id)];
        useEffect(() => {
            data.forEach(element => {
                element.child_categories.forEach(x => {
                    if(x.category_id == category_id){
                        setChild(x.category_name)
                    }  
                })
            });
        }, [category_id]);
        useEffect(() => {
            data.forEach(element => {
                element.child_categories.forEach(x => {
                    if(x.category_id == category_id){
                        setParentId(x.parent_id)
                    }  
                })
            });
        }, [category_id]);
        useEffect(() => {
            data.forEach(element => {
                if(element.category_id == parentId){
                    setParent(element.category_name)
                }
            });
        }, [parentId]);
        return (
            parent &&
            child && (
                <div className="d-start">
                    <span>{parent}</span>
                    <span className="px-2 d-center">
                        {' '}
                        <IconChevronRight />{' '}
                    </span>
                    <span>{child}</span>
                </div>
            )
        );
    };
    return renderCategoryLink();
}
