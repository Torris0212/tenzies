import React from 'react'

export default function Button(props) {
    return (
        <button
            className='roll-dice'
            onClick={props.roll}
        >
            {props.tenzies ? "New Game" : "Roll"}
        </button>
    )
}