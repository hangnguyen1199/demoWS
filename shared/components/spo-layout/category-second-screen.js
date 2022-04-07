import React from 'react';
import IconChevronRight from './../common/icon-chevron-right';
import IconArrowLeftShort from './../common/icon-arrow-left-short';
import IconX from './../common/icon-x';
import { useDispatch } from 'react-redux';
import SearchItemActions from '@spo/redux/search-item/action';
import { useRouter } from 'next/router';
import Screen from '../common/screen';


/**
* ****************************************************************************
* DUNGNT CategorySecondScreen CODE
* category-second-screen.js 
* 
* description		:	
* created at		:	2020-09-07 
* created by		:	DungNT 
* package			:	spo\shared\components\spo-layout\category-second-screen.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/
function CategorySecondScreen (props) {
    const dispatch = useDispatch()
    const router = useRouter()
    const { data, show } = props;
    
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onChange = (item) => {
        dispatch({ type: SearchItemActions.UPDATE_CATEGORY_SECOND_SELECTED, data: item })
        dispatch({ type: SearchItemActions.TOGGLE_CATEGORY_SCREEN })
        dispatch({ type: SearchItemActions.TOGGLE_CATEGORY_SECOND_SCREEN })
    };
    const onClose = () => {
        dispatch({ type: SearchItemActions.TOGGLE_CATEGORY_SCREEN })
        dispatch({ type: SearchItemActions.TOGGLE_CATEGORY_SECOND_SCREEN })
    };
    const onBack = () => {
        dispatch({ type: SearchItemActions.TOGGLE_CATEGORY_SECOND_SCREEN })
    };
    return (
        <Screen scrollClass="scroll_1" open={show} className={`category-filter-screen`}>
            <div className="col-12 px-0">
                <div className="top w-100 col-12 px-2">
                    <div className="d-start col-3 px-0">
                        <div
                            className="close"
                            onClick={onBack}>
                            <IconArrowLeftShort fontSize={30} />
                        </div>
                    </div>
                    <div className="col-6 text-center title_screen">{data.title}</div>
                    <div className="col-3 px-0">
                        <div className=" d-end" onClick={onClose}>
                            <IconX fontSize={32} />
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2">
                    {data.child_categories?.map((item, index) => {
                        return (
                            <div key={index} className={`category-wrap `}>
                                <div
                                    className="category-title"
                                    onClick={() => onChange(item)}>
                                    <span>{item.category_name}</span>
                                    <span className={`d-center icon `}>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Screen>
    );
}
export default CategorySecondScreen;
