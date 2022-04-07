import React, { useState } from 'react';
import IconChevronRight from '../common/icon-chevron-right';
import IconArrowLeftShort from './../common/icon-arrow-left-short';
import CategoryFilterSubScreen from './category-filter-sub-screen';

function CategoryFilterScreen(props) {
    const { data, show } = props;

    const [showCategoryScreen, setShowCategoryScreen] = useState(false);
    const [subData, setSubData] = useState({});
    //----------------------------------------------
    // Function
    //----------------------------------------------
    const onHandleClickCategorySub = (item) => {
        setSubData(item);
        setShowCategoryScreen(true);
    };
    const onChange = (cat) => {
        props.onChange(cat);
        props.onCloseScreen();
    };
    const onClose = () => {
        setShowCategoryScreen(false)
        props.onCloseScreen();
    };
    return (
        <div className={`category-filter-screen ${show ? 'active' : ''}`}>
            <CategoryFilterSubScreen
                data={subData}
                show={showCategoryScreen}
                onCloseScreen={() => setShowCategoryScreen(false)}
                onChange={onChange}
                onClose={onClose}
            />
            <div className="col-12 px-0">
                <div className="top w-100 col-12 px-2">
                    <div className="d-start col-3 px-0">
                        <div
                            className="close"
                            onClick={() => props.onCloseScreen()}>
                            <IconArrowLeftShort fontSize={30} />
                        </div>
                    </div>
                    <div className="col-6 text-center">Danh mục</div>
                    <div className="col-3"></div>
                </div>
                <div className="px-3 py-2">
                    {data.map((item, index) => {
                        return (
                            <div key={index} className={`category-wrap `}>
                                <div
                                    className="category-title"
                                    onClick={() =>
                                        onHandleClickCategorySub(item)
                                    }>
                                    <span>{item.title}</span>
                                    <span className={`d-center icon `}>
                                        <IconChevronRight />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
CategoryFilterScreen.propTypes = {};
CategoryFilterScreen.defaultProps = {};
export default CategoryFilterScreen;
