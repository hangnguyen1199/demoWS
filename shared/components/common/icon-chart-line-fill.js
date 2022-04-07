import React from 'react';

/**
* ****************************************************************************
* DUNGNT IconChartLineFill CODE
* icon-chart-line-fill.js 
* 
* description		:	
* created at		:	2021-03-16 
* created by		:	DungNT 
* package			:	spo\shared\components\common\icon-chart-line-fill.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
function IconChartLineFill(props) {
    return (
        <div
            className="icon-chart-line-fill d-center"
            style={{ fontSize: props.fontSize ?? 20 }}>
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-bar-chart-line-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"
                />
            </svg>
        </div>
    );
}
export default IconChartLineFill;
