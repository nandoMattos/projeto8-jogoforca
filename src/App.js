import { useState } from "react";
import words from "./words";


export default function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [buttonText, setButtonText] = useState("Escolher palavra")
    const [enableAllLetters, setEnableAllLetters] = useState(false)
    const [usedLetters, setUsedLetters] = useState([])
    const [word, setWord] = useState("");
    const [wordOnScreen, setwordOnScreen] = useState("");
    const [colorWordScreen, setColorWordScreen] = useState("");
    const [mistakesCount, setMistakesCount] = useState(0);
    const [input, setInput] = useState();

    function resestVariables() {
        setEnableAllLetters(true)
        setUsedLetters([]);
        setColorWordScreen("");
        setMistakesCount(0);
        setButtonText("Escolher palavra")
    }

    function startGame() {
        resestVariables()

        // get a random word
        let randomWord = words[Math.floor(Math.random() * words.length)]
        setWord(randomWord)
        console.log(randomWord)
    
        // transform the word into an array and set it
        setwordOnScreen((randomWord.split('')).map(()=>"_"))
    }

    function disableLetter(index) {
        setUsedLetters([...usedLetters, index])
    }

    function checkGameStatus(mistakesCountNow) {
        // check if user lost the game
        if(mistakesCountNow >= 6) {
            setEnableAllLetters(false)
            setwordOnScreen(word)
            setColorWordScreen("red")
            setButtonText("Começar")
        }

        // check if user won the game
        if(wordOnScreen.join("") === word) {
            setEnableAllLetters(false)
            setColorWordScreen("green")
            setButtonText("Começar")
        }
    }

    function searchLetterInWord(letterOrArray) {
        if (typeof(letterOrArray) === "object") {
            for(let i in word) {
                for(let j in letterOrArray) {
                    if (word[i] === letterOrArray[j]){
                        let newWord = wordOnScreen
                        newWord[i] = letterOrArray[j];
                    }
                }
            }
        } else {
            for(let i in word) {
                if(word[i] === letterOrArray){
                    let newWord = wordOnScreen;
                    newWord[i] = letterOrArray;
                }
            }
        }
    }

    function clickLetter(letter, index) {
        disableLetter(index)
        let wordAccentFree = word.normalize("NFD").replace(/[^a-zA-Z\s]/g, ""); 
        let possibleAcents;
        let mistakesCountNow;
        if (wordAccentFree.includes(letter)){
            switch(letter){
                case "a": possibleAcents = ["a", "á", "ã",]; break;
                case "e": possibleAcents = ["e", "é", "ê"]; break;
                case "i": possibleAcents = ["i", "í"]; break;
                case "o": possibleAcents = ["o", "ó", "ô"]; break;
                case "u": possibleAcents = ["u", "ú"]; break;
                case "c": possibleAcents = ["c", "ç"]; break
                default: possibleAcents = null;
            }
            possibleAcents ? searchLetterInWord(possibleAcents) : searchLetterInWord(letter)
        } else {
            mistakesCountNow = mistakesCount+1;
            setMistakesCount(mistakesCountNow)
        }

        checkGameStatus(mistakesCountNow)
    }

    function takeShot() {
        if(input){
            let formatedInput = input.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toLowerCase();
            let formatedWord = word.normalize("NFD").replace(/[^a-zA-Z\s]/g, "").toLowerCase();
            setEnableAllLetters(false)
            setButtonText("Começar")
            setwordOnScreen(word)
            if (formatedInput === formatedWord){
                setColorWordScreen("green")
            } else {
                setColorWordScreen("red")
                setMistakesCount(6);
            } 
            setInput("");
        }
    }

    return(
        <main>
            <div className="top">
                <img src={`assets/forca${mistakesCount}.png`} alt="forca"/>
    
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
                            <button onClick={()=>clickLetter(letter,index)} disabled key={index}>
                                {letter.toUpperCase()}
                            </button> 
                        ):
                        alphabet.map((letter,index)=>
                            <button onClick={()=>clickLetter(letter,index)} disabled={usedLetters.includes(index) ? "disabled" : ""} key={index}>
                                {letter.toUpperCase()}
                            </button>
                        )
                    }
                </div>

                <div className="input-container">
                    Já sei a palavra!
                    <input onChange={e => setInput(e.target.value)} value={input} type="text"/>
                    <button onClick={takeShot} disabled={enableAllLetters ? "" : "disabled"}>Chutar</button>
              </div>
            </div>
        </main>
    )

}