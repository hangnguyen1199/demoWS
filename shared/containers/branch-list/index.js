import React, { useState, useEffect } from 'react';
import Bottom from '../item-detail/components/bottom';
import BreadCrumb from './../../components/common/breadcrumb';
import BranchListComponent from '../../components/branch-list/BranchListComponent';
import { useSelector, useDispatch } from 'react-redux';
import CommonActions from '@spo/redux/common/action';
import PageList from "../../config/PageList";

BranchListContainer.propTypes = {};

function BranchListContainer(props) {
    const dispatch = useDispatch();

    const data_bread_crumb = [
        { name: 'Trang chủ', path_name: '/' },
        { name: 'Hệ thống cửa hàng', path_name: PageList.BRANCH_LIST.SERVER },
    ];

    useEffect(() => {
        dispatch({
            type: CommonActions.LOAD_BRANCH_MASTER,
            data: {
                type: 0,
            },
        });
    }, []);
    const [breadcrum, setBreadcrum] = useState(data_bread_crumb);
    const { listBranch } = useSelector((state) => state.Common.data);
    return (
        <div className="bg-white">
            {/* <Header /> */}
            <BreadCrumb data={breadcrum} />

            <div className="px-0">
                <div className="row pd-lr-common branchlist-master-component ml-0 mr-0">
                    <BranchListComponent
                        listBranch={listBranch}></BranchListComponent>
                </div>
            </div>
            <Bottom />
        </div>
    );
}

export default BranchListContainer;
