import { useEffect, useState } from "react";
import palavras from "./palavras";


export default function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [buttonText, setButtonText] = useState("Escolher palavra")
    const [enableAllLetters, setEnableAllLetters] = useState(false)
    const [usedLetters, setUsedLetters] = useState([])
    const [word, setWord] = useState("");
    const [wordOnScreen, setwordOnScreen] = useState("");
    const [colorWordScreen, setColorWordScreen] = useState("");
    const [mistakesCount, setMistakesCount] = useState(0);

    function resestVariables() {
        setEnableAllLetters(true)
        setUsedLetters([]);
        setColorWordScreen("");
        setMistakesCount(0);
    }

    function startGame() {
        resestVariables()

        // get a random word
        let randomWord = palavras[Math.floor(Math.random() * palavras.length)]
        setWord(randomWord)
        console.log(randomWord)
    
        // transform the word into an array and set it
        setwordOnScreen((randomWord.split('')).map(()=>"_"))
    }

    function disableLetter(index) {
        setUsedLetters([...usedLetters, index])
    }

    function checkGameStatus() {
        // check if user lost the game
        if(mistakesCount >= 5) {
            setEnableAllLetters(false)
            setwordOnScreen(word)
            setColorWordScreen("red")
            setButtonText("Mudar palavra")
        }

        // check if user won the game
        if(wordOnScreen.join("") === word) {
            setEnableAllLetters(false)
            setColorWordScreen("green")
            setButtonText("Mudar palavra")
        }
    }

    function clickLetter(letter, index) {
        disableLetter(index)
        if (word.includes(letter)) {
            for (let i in word) {
                if(word[i] === letter) {
                    let newWordScreen = wordOnScreen
                    newWordScreen[i] = letter
                }
            }
        } else {
            setMistakesCount(mistakesCount + 1)
        }
        
        checkGameStatus()
    }

    return(
        <main>
            <div className="top">
                <img src={`assets/forca${mistakesCount}.png`}/>
    
                <div className="right-content">
                    <button onClick={startGame}>{buttonText}</button>

                    <div className={`word ${colorWordScreen}`} >
                        {wordOnScreen}
                    </div>
                </div>

            </div>

            <div className="bottom">
                <div className="keyboard">
                    { enableAllLetters === false ?
                        alphabet.map((letter, index)=>
                            <button onClick={()=>clickLetter(letter,index)} disabled>
                                {letter.toUpperCase()}
                            </button> 
                        ):
                        alphabet.map((letter,index)=>
                            <button onClick={()=>clickLetter(letter,index)} disabled={usedLetters.includes(index) ? "disabled" : ""}>
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