import InputContainer from "./InputContainer";
import Keybaord from "./Keyboard";

export default function App() {
    return(
        <div className="main-content">
            <div className="top">
                <img src="assets/forca0.png" alt="forca"/>
    
                <button>Escolher palavra</button>
            </div>

            <div className="bottom">
                <Keybaord/>

                <InputContainer/>
            </div>
        </div>
    )
}