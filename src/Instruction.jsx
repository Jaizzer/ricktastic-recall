import { useRef, useState } from 'react';
import buttonClickSfx from './assets/button-click.wav';
import rickAndMorty from './assets/rick-and-morty.png';

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
                <div className="instruction-container">
                    <div className="instruction">
                        <button
                            className="close-instruction-button"
                            onClick={handleClick}
                        >
                            x
                        </button>
                        <div className="description">
                            <p>
                                Wubba Lubba Dub-Dub! Flip cards, but don’t click
                                the same one twice!
                            </p>
                            <p>
                                Improve your score or quit—just kidding! Or am
                                I? Good luck!
                            </p>
                        </div>
                    </div>
                    <img
                        src={rickAndMorty}
                        onClick={handleClick}
                        className="rick-and-morty"
                    />
                </div>
            )}
        </>
    );
}
