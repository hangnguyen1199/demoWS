import React from 'react';
import IconArrowLeft from './icon-arrow-left';

function Accordion (props) {
    const { panel, onClick, expanded, namePanel, details } = props;
    const handleClick = (item, e) =>{
        e.preventDefault();
        e.stopPropagation();
        onClick(item)
    }
    return (
        <div className="accordion">
            <div
                onClick={() => onClick(panel)}
                className="item__accordion__summary"
            >
                <p className={`${panel === expanded ? null : "title_hover"}`}>
                    {namePanel}
                </p>
                <div
                    className={`icon__arrow__top ${panel === expanded ? null : "icon__arrow__top__hover"
                    }  ${panel === expanded ? "active" : ""}`}
                    onClick={(e) => handleClick(panel,e)}
                >
                    <IconArrowLeft />
                </div>
            </div>
            <div
                dangerouslySetInnerHTML={{
                    __html: details,
                }}
                className={` item__accordion__details ${panel === expanded ? "active" : ""
                }`}
            ></div>
        </div>
    )
}
export default Accordion;