import React, { useState } from 'react';
import jwtDecode from "jwt-decode";

function useJwtDecode (token) {
    const [value, setValue] = useState({})
    if (token) {
        setValue(jwtDecode(token))
    }
    const isExpired = () => {
        return new Date() > 0;
    }
    return {
        value,
        isExpired: isExpired(),
    }
}
export default useJwtDecode;