import React from 'react'
import QuestionItem from '../item/question-item'

const data=[
    {id:1},
    {id:2},
    {id:3},
    {id:2},
    {id:1},
    {id:1},
    {id:3}
]
const handleJoin = (item) =>{
    console.log(item)
}
export default function ChallengeQuestion() {
    return (
        <div>
            {data.map((item,index)=>{
                return <QuestionItem item={item} key={index} onClick={handleJoin}/>
            })}
        </div>
    )
}
