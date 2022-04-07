import React from 'react';
/**
* ****************************************************************************
* DUNGNT UseAlert CODE
* use-alert.js 
* 
* description		:	
* created at		:	2020-11-27 
* created by		:	DungNT 
* package			:	spo\shared\library\use-alert.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
export const useAlert = (title = "Outfiz", icon = "success", button = false, className = "black-bg", timer = 2000) => {
    swal({
        title,
        icon,
        button,
        className,
        timer
    })

}
export default useAlert;