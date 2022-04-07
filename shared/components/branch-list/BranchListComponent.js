import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MapComponent from './MapComponent';
import ListingComponent from './ListingComponent';

BranchListComponent.propTypes = {
    listBranch: PropTypes.array,
};

BranchListComponent.defaultProps = {
    listBranch: [],
};

function BranchListComponent(props) {
    const { listBranch } = props;

    const [selectedBranch, setSelectedBranch] = useState(null);

    const onSelectedBranch = (item) => {
        setSelectedBranch(item);
    };

    return (
        <div className="d-flex branchlist-wrapper">
            <div className="listing-wrapper">
                <ListingComponent
                    listBranch={listBranch}
                    onSelectedBranch={onSelectedBranch}></ListingComponent>
            </div>
            <div className="map-wrapper">
                <MapComponent
                    listBranch={listBranch}
                    item={selectedBranch}></MapComponent>
            </div>
        </div>
    );
}

export default BranchListComponent;
