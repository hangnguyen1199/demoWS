import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const HashTag = (props) => {
    const onChange = (val) => {
        props.onChange(val)
    }
    return (
        <div className="hashtag_filter">
            {props.data?.map((tag, index) => (
                <div className="hashtag link-hover" key={index} onClick={() => onChange(tag.hashtag_name)} >
                    # {tag.hashtag_name}
                </div>
            ))}
        </div>
    );
};

export default HashTag;
