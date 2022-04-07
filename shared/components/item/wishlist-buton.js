import React from 'react';
import IconHeart from './../common/icon-heart';
import IconHeartFill from './../common/icon-heart-fill';

export default function WishListButton (props) {
    return (
        <div
            className="pr-2 pointer link-hover wishlist-btn "
            onClick={() => props.onChange()}>
            {!props.active && (
                <span className="d-center">
                    <IconHeart fontSize={30} />
                </span>
            )}
            {props.active && (
                <span className="color-primary d-center">
                    <IconHeartFill fontSize={30} />
                </span>
            )}
        </div>
    );
}
