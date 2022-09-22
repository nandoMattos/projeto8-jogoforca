import { useState } from "react";
// import Letter from "./Letter";
import palavras from "./palavras";


export default function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    const [enableAllLetters, setEnableAllLetters] = useState(false)
    const [usedLetters, setUsedLetters] = useState([])
    const [wordOnScreen, setwordOnScreen] = useState("");
    
    const [word, setWord] = useState(palavras[Math.floor(Math.random() * palavras.length)]);

    function startGame() {
        setEnableAllLetters(true)
        console.log(word)
        // get a random word
        // setWord(palavras[Math.floor(Math.random() * palavras.length)])
        // console.log(word)

        // transform the word into an array and set it
        let wordArray = word.split('')
        if (wordArray) setwordOnScreen(wordArray.map(()=>"_"))
    }

    function disableLetter(index) {
        setUsedLetters([...usedLetters, index])
    }

    function clickLetter(letter, index) {
        disableLetter(index)
        console.log(alphabet[index], index)
        for (let i in word) {
            if(word[i] === letter) {
                let newWord = wordOnScreen
                newWord[i] = letter
            }
        }
        // let array = word.split('')
        // console.log(array)
        // for(let )
    }

    return(
        <main>
            <div className="top">
                <img src="assets/forca0.png" alt="forca"/>
    
                <div className="right-content">
                    <button onClick={startGame}>Escolher palavra</button>

                    <div className="word">
                        {wordOnScreen}
                    </div>
                </div>

            </div>

            <div className="bottom">
                <div className="keyboard">
                    { enableAllLetters === false ?
                        alphabet.map((letter, index)=>
                            <button disabled onClick={()=>clickLetter(letter,index)}>
                                {letter.toUpperCase()}
                            </button> 
                        ):
                        alphabet.map((letter,index)=>
                            <button disabled={usedLetters.includes(index) ? "disabled" : ""} onClick={()=>clickLetter(letter,index)}>
                                {letter.toUpperCase()}
                            </button>
                        )
                    }
                     
                        
                </div>

                <div className="input-container">
                    Já sei a palavra!
                    <input type="text"/>
                    <button>Chutar</button>
              </div>
            </div>
        </main>
    )

}