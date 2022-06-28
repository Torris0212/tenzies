import React from "react";

export default function Statistics(props) {
    return (
        <>
            <div className='statistics'>
                <p>Rolls clicked: {props.count}</p>
                <p>Time: {props.timer}s</p>
            </div>
            <div className='statistics'>
                <p>Best Rolls clicked: {props.bestRollClicked}</p>
                <p>Best Time: {props.bestTimeUsed}s</p>
            </div>
        </>
    )
}