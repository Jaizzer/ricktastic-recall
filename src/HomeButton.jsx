import { useRef } from 'react';
import buttonClickSfx from './assets/button-click.wav';

export default function HomeButton({ goToHome, areSfxEnabled }) {
    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));
    return (
        <div
            className="home-button"
            onClick={() => {
                
                if (areSfxEnabled) {
                    buttonClickSfxRef.current.play();
                }
                goToHome();
            }}
        >
            <img src="" alt="Home" className="home-button-icon"></img>
            <div className="home-button-text">Memory Quest</div>
        </div>
    );
}
