import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from '@spo/components/common/image';
import RenderInput from '@spo/components/redux-form/order/render-input';
import { Field, reduxForm } from 'redux-form';
import BranchRowComponent from './BranchRowComponent';
import Utils from '../../utils/utils';

ListingComponent.propTypes = {
    listBranch: PropTypes.array,
    onSelectedBranch: PropTypes.func,
};

ListingComponent.defaultProps = {
    listBranch: [],
    onSelectedBranch: null,
};

function ListingComponent(props) {
    const lbl_search = 'Tìm kiếm';
    const { listBranch, onSelectedBranch } = props;
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        if (listBranch?.length > 0) {
            setBranches(listBranch);
        }
    }, [listBranch]);

    const filterBranches = (value) => {
        let data = listBranch.filter(function (item) {
            const address = `${item?.Address}, ${item?.CommuneName}, ${item?.DistrictName}, ${item?.ProvinceName}`;
            const nonAddress = Utils.specialTrim(address);
            const nonSearchText = Utils.specialTrim(value);
            return nonAddress.includes(nonSearchText);
        });

        setBranches(data);
    };

    return (
        <div className="listing-component">
            <div className="container">
                <div className="row px-0">
                    <div className="col-12 px-0">
                        <div className="input-branch-search d-flex align-items-center">
                            <Image
                                src={`/images/icon/Search_Gray.svg`}
                                style={{
                                    paddingTop: '10px',
                                    paddingLeft: '5px',
                                }}
                            />
                            <Field
                                id="KeywordId"
                                placeholder={lbl_search}
                                name="KeywordId"
                                component={RenderInput}
                                type="text"
                                className="input-order-style"
                                onChange={(e) => filterBranches(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row branch-list">
                    {branches.map((item, index) => {
                        return (
                            <div
                                style={{ width: '100%' }}
                                onClick={() => {
                                    if (onSelectedBranch) {
                                        onSelectedBranch(item);
                                    }
                                }}
                                key={index}>
                                <BranchRowComponent
                                    item={item}></BranchRowComponent>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default reduxForm({ form: 'ListingComponentForm' })(ListingComponent);
