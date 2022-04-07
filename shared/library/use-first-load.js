import React, { useEffect, useState } from 'react';

function UserFirstLoad (value) {
    const [firstLoad, setFirstLoad] = useState(false)
    useEffect(() => {
        if(value){
            setFirstLoad(true)
        }else{
            setFirstLoad(false)
        }
    }, [value]); // Empty array ensures that effect is only run on mount

    return firstLoad;
}
export default UserFirstLoad;