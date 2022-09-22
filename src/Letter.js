import React from "react"

export default function Letter({ wordArray, letter, index}) {
    let [buttonState, setButtonState] = React.useState("")

    function clickLetter(letter) {
        disableLetter()

        for(let position in wordArray){
            if(wordArray[position] === letter){
                // showLetter(position, letter)
            }
        }
    }

    function disableLetter() {
        setButtonState("disabled")
    }

    return(
        <button id={index} disabled={buttonState} onClick={()=>clickLetter(letter)}>
            {letter.toUpperCase()}
        </button>
    )
}   