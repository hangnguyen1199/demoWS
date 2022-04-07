import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { handleScroll } from '../../library/helper';

/**
 * ****************************************************************************
 * DUNGNT Loader CODE
 * loader.js
 *
 * description		:
 * created at		:	2020-08-23
 * created by		:	DungNT
 * package			:	spo\shared\components\spo-layout\loader.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */

function Loader(props) {
    const { loading } = props;
    //----------------------------------------------
    // Effect
    //----------------------------------------------
    useEffect(() => {
        // if (loading) {
        //     document.getElementsByTagName('html')[0].classList.add('no-scroll');
        // } else {
        //     document
        //         .getElementsByTagName('html')[0]
        //         .classList.remove('no-scroll');
        // }
        handleScroll(loading,'no-scroll')
    }, [loading]);
    return (
        loading && (
            <div className={`wrap-loader d-center ${loading ? '' : 'd-none'}`}>
                <img
                    style={{ width: 40, height: 40 }}
                    src="/images/loading.gif"
                    alt="Loading..."
                />
            </div>
        )
    );
}
Loader.propTypes = {
    loader: PropTypes.bool,
};
Loader.defaultProps = {
    loader: false,
};
export default Loader;
