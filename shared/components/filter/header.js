import React from 'react';
import { useSelector } from 'react-redux';

function Header (props) {
    const { data: { total, keyword } } = props
    return (
        <div className="col-12 px-0">
            <div className="d-none d-md-flex justify-content-md-start flex-md-row search-h2 w-100 col-12">
                <h2 className="">#{keyword}</h2>
                <div className="d-flex search-result">
                    <label className="align-content-lg-center align-self-center">
                        ({total} Sản phẩm)
                    </label>
                </div>
            </div>
            <div className="d-flex d-md-none  search-h2 w-100 flex-wrap px-2">
                <h2 className="d-center col-12">#{keyword}</h2>
                <div className="d-flex search-result col-12 d-center">
                    {total} Sản phẩm
                </div>
            </div>
        </div>
    );
}

export default React.memo(Header)