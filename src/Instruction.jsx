import { useRef, useState } from 'react';
import buttonClickSfx from './assets/button-click.wav';

export default function Instruction({ areSfxEnabled }) {
    const [isInstructionVisible, setIsInstructionVisible] = useState(false);

    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));

    function handleClick() {
        // Play button sound fx if sfx are enabled
        if (areSfxEnabled) {
            buttonClickSfxRef.current.play();
        }

        if (isInstructionVisible) {
            setIsInstructionVisible(false);
        } else {
            setIsInstructionVisible(true);
        }
    }

    return (
        <>
            <button className="instruction-button" onClick={handleClick}>
                {isInstructionVisible ? 'Hide Instruction' : 'Show Instruction'}
            </button>
            {isInstructionVisible && (
                <div className="instruction">
                    <div className="description">
                        <p>Welcome to Rickstatic Recall</p>
                        <p>
                            Flip one card at a time, and try not to click the
                            same card twice.
                        </p>
                        <p>
                            Keep track of your score and challenge yourself to
                            improve!
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
