import React from 'react'
import IconArrowLeft from '../common/icon-arrow-left'

function FaqSection(props) {
    const { item, clickName, index, Active } = props
    return (
        <div className=" accordion ">
            <div
                className={`item__accordion__summary `}
                onClick={() => clickName(index)}
            >
                <p className="title_hover">{item.Name}</p>

                <div
                    className={`icon__arrow__top ${
                        Active ? null : 'icon__arrow__top__hover'
                    }  ${Active ? 'active' : ''}`}
                    onClick={() => clickName(index)}
                >
                    <IconArrowLeft />
                </div>
            </div>
            {item.Data.map((child, line) => {
                return (
                    <div
                        className={` item__accordion__details ${
                            Active ? 'active' : ''
                        }`}
                        key={line}
                    >
                        <div className="title">{child.Question}</div>
                        <div
                            dangerouslySetInnerHTML={{ __html: child.Answer }}
                        ></div>
                    </div>
                )
            })}
        </div>
    )
}
export default FaqSection
