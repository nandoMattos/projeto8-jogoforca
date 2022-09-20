import React from "react"

function oi() {
    console.log('oi')
}

export default function Letter({letter}) {
    return(
        <div className="letter">
            <button onClick={oi}>
                {letter.toUpperCase()}
            </button>
        </div>
    )
}