import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import constants from '@spo/config/constants';
import ContentLoader from "react-content-loader"

const ItemLoader = (props) => {
    const [_state, setNewState] = useState({
        _className: props.className
    });
    useEffect(() => {
        setNewState({
            ..._state,
            _className: `${_state._className} item`
        });
    }, []);
    return (
        props.typeview === constants.TYPE_VIEW_ITEM.LARGER ?
            <ContentLoader
                speed={2}
                width={418}
                height={614}
                viewBox="0 0 418 614"
                backgroundColor="#f3f3f3"
                foregroundColor="#f5efdb"
                className={props.className}
            >
                <rect x="0" y="29" rx="0" ry="0" width="418" height="585" />
                <rect x="0" y="0" rx="5" ry="5" width="180" height="15" />
                <rect x="195" y="0" rx="5" ry="5" width="222" height="15" />
            </ContentLoader>
            :
            props.typeview === constants.TYPE_VIEW_ITEM.LIST ?
                <ContentLoader
                    speed={2}
                    width={923}
                    height={310}
                    viewBox="0 0 923 310"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#f5efdb"
                    className={props.className}
                >
                    <rect x="0" y="0" rx="0" ry="0" width="210" height="294" />
                    <rect x="234" y="59" rx="5" ry="5" width="150" height="15" />
                    <rect x="234" y="35" rx="5" ry="5" width="300" height="15" />
                    <rect x="234" y="97" rx="5" ry="5" width="688" height="15" />
                    <rect x="234" y="122" rx="5" ry="5" width="688" height="15" />
                    <rect x="234" y="148" rx="5" ry="5" width="688" height="15" />
                    <rect x="234" y="181" rx="5" ry="5" width="180" height="15" />
                    <rect x="234" y="214" rx="0" ry="0" width="150" height="40" />
                </ContentLoader>
                :
                <ContentLoader
                    speed={2}
                    width={268}
                    height={340}
                    viewBox="0 0 268 340"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#f5efdb"
                    className={props.className}
                    {...props}
                >
                    <rect x="37" y="280" rx="5" ry="5" width="194" height="13" />
                    <rect x="59" y="305" rx="5" ry="5" width="150" height="13" />
                    <rect x="81" y="326" rx="5" ry="5" width="105" height="13" />
                    <circle cx="133" cy="123" r="31" />
                    <rect x="42" y="15" rx="0" ry="0" width="26" height="250" />
                    <rect x="199" y="15" rx="0" ry="0" width="26" height="250" />
                    <rect x="42" y="15" rx="0" ry="0" width="180" height="46" />
                    <rect x="42" y="192" rx="0" ry="0" width="183" height="75" />
                    <rect x="79" y="77" rx="0" ry="0" width="6" height="95" />
                    <rect x="182" y="77" rx="0" ry="0" width="5" height="95" />
                    <rect x="81" y="77" rx="0" ry="0" width="105" height="6" />
                    <rect x="82" y="166" rx="0" ry="0" width="105" height="6" />
                </ContentLoader>
    )
}

ItemLoader.propTypes = {
    className: PropTypes.string,
    typeview: PropTypes.string
}

ItemLoader.defaultProps = {
    className: 'col-12 col-sm-4 col-md-3',
    typeview: constants.TYPE_VIEW_ITEM.GRID
}

export default ItemLoader