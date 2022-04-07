import React from 'react'
import HappeningItem from './../item/happening-Item';

const data = [
    { id: 1 ,status:2},
    { id: 2 ,status:2},
    { id: 3 ,status:2},
    { id: 3 ,status:2},
    { id: 2 ,status:2},
    { id: 1 ,status:2},
    { id: 1 ,status:2}
]
export default function ChallengeHappening() {
    return (
        <div>
            {data.map((item, index) => {
                return <HappeningItem className="btn-happy" item={item} key={index} />
            })}
        </div>
    )
}
