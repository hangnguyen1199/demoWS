import React from 'react';

function MultiHashtag (props) {
    const { data, listChecked } = props
    const onChange = (val) => {
        props.onChange(val)
    }
    return (
        <div className="hashtag_filter">
            {data?.map((tag, index) => (
                <div key={index} >
                    { listChecked ? <div  className={`hashtag link-hover ${listChecked.includes(tag.hashtag_name) ? 'active' : ''}`}  onClick={() => onChange(tag.hashtag_name)} >
                        # {tag.hashtag_name}
                    </div> :
                        <div key= { index } className={`hashtag link-hover `}  onClick={() => onChange(tag.hashtag_name)} >
                            # {tag.hashtag_name}
                        </div>
                    }
                </div>
            ))}
        </div >
    );
}
export default MultiHashtag;