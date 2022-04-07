import React from 'react';

export default (list, key, id) => {
    const index = list.findIndex((x) => x[key] == id);
    return list[index];
};
