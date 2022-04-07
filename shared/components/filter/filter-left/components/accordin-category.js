import React, { useState } from 'react';
import IconFeatherPlus from '../../../common/icon-feather-plus';
import IconFeatherPlusShow from '../../../common/icon-feather-plus-show';
import IconRectangle from '../../../common/icon-rectangle';
import IconRectangleCheck from '../../../common/icon-rectangle-check';

export default function AccordinCategory(props) {
    const { handleCheckCategory, childGroup, indexGroup } = props;
    const [openChild, setOpenChild] = useState(true);
    return (
        <>
            <div>
                <div className="accordion-filter-main-item d-flex flex-row justify-content-between">
                    <div
                        onClick={() => {
                            handleCheckCategory(childGroup, null);
                        }}
                        className=" w-100 d-flex  align-items-center"
                    >
                        {childGroup?.checked ? (
                            <IconRectangleCheck fontSize={11} />
                        ) : (
                            <IconRectangle fontSize={11} />
                        )}
                        <p style={{fontWeight: 'var(--fontMedium'}}>{childGroup.Name}</p>
                    </div>
                    <span
                        onClick={() => {
                            setOpenChild(!openChild);
                        }}
                    >
                        {openChild ? (
                            <IconFeatherPlus />
                        ) : (
                            <IconFeatherPlusShow />
                        )}
                    </span>
                </div>

                <div
                    className={`accordion-filter-main-details lv2 d-flex flex-row flex-wrap ${
                        openChild ? 'active' : ''
                    }`}
                >
                    {childGroup.CategoriesChild.map((sub, indexSub) => (
                        <div
                            key={indexSub}
                            onClick={() => {
                                handleCheckCategory(sub, indexGroup);
                            }}
                            className="accordion-filter-main-item-child"
                        >
                            {sub?.checked ? (
                                <IconRectangleCheck fontSize={11} />
                            ) : (
                                <IconRectangle fontSize={11} />
                            )}
                            <p className='text-truncate' title={sub.Name}>{sub.Name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
