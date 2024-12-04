import { useRef } from 'react';
import buttonClickSfx from './assets/button-click.wav';

export default function HomeButton({ goToHome, areSfxEnabled }) {
    // Create a reference to the button click sound effect audio
    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));

    return (
        <div
            className="home-button"
            onClick={() => {
                // Play the button click sound if SFX are enabled
                if (areSfxEnabled) {
                    buttonClickSfxRef.current.play();
                }
                // Execute the provided goToHome function (to navigate to the home screen)
                goToHome();
            }}
        >
            {/* Display the text of the home button */}
            <div className="home-button-text">Rickstatic Recall</div>
        </div>
    );
}
