import React from 'react';
import IconGridView from './icon-grid-view';

function ButtonGridView(props) {
    return (
        <div className="button-grid-view d-center" style={{ color: props.color }}>
            <IconGridView fontSize={20}  />
        </div>
    );
}
export default ButtonGridView;
