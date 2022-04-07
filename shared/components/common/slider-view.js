import React, { useState } from 'react';
import IconListView from './icon-list-view';
import IconGridView from './icon-grid-view';

export default function SliderView(props) {
    const [active, setActive] = useState(1);
    return (
        <div
            className="slider-view d-center p-1 pointer"
            onClick={() => setActive(active == 1 ? 2 : 1)}>
            <div className={`item d-center ${active == 1 ? 'active' : ''}`}>
                <IconListView fontSize={16} />
            </div>
            <div className={`item d-center ${active == 2 ? 'active' : ''}`}>
                <IconGridView fontSize={16} />
            </div>
        </div>
    );
}
