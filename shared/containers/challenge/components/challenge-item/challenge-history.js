import React from 'react'
import HappeningItem from './../item/happening-Item';


const data = [
    { id: 1 ,status:1},
    { id: 2 ,status:2},
    { id: 3 ,status:3},
    { id: 4 ,status:1},
    { id: 5 ,status:3 , progress:2 , max: 10}
]
export default function ChallengeHistory() {
    return (
        <div>
            {data.map((item, index) => {
                return <HappeningItem className="btn-history" item={item} key={index} />
            })}
        </div>
    )
}
