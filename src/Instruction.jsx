import { useRef, useState } from 'react';
import buttonClickSfx from './assets/button-click.wav';
import rickAndMorty from './assets/rick-and-morty.png';
import instructionIcon from './assets/show-instruction.png';
import closeIcon from './assets/close.png';

export default function Instruction({ areSfxEnabled }) {
    // State to control visibility of the instruction popup
    const [isInstructionVisible, setIsInstructionVisible] = useState(false);

    // Ref to manage the button click sound effect
    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));

    // Function to handle the button click (toggle instructions visibility and play sound)
    function handleClick() {
        // Play button sound effect if sound effects are enabled
        if (areSfxEnabled) {
            buttonClickSfxRef.current.play();
        }

        // Toggle instruction visibility
        setIsInstructionVisible((prevState) => !prevState);
    }

    return (
        <>
            {/* Button to toggle instruction visibility */}
            <button className="instruction-button" onClick={handleClick}>
                <img
                    src={isInstructionVisible ? closeIcon : instructionIcon}
                    alt="Toggle Instructions"
                    className={
                        isInstructionVisible
                            ? 'close-instruction-button-icon'
                            : 'instruction-button-icon'
                    }
                />
            </button>

            {/* Instruction popup, displayed when visible */}
            {isInstructionVisible && (
                <div className="instruction-container">
                    <div className="instruction">
                        {/* Close button inside the popup */}
                        <button
                            className="close-instruction-button"
                            onClick={handleClick}
                        >
                            <img
                                src={closeIcon}
                                alt="Close Instructions"
                                className="close-instruction-button-icon"
                            />
                        </button>

                        {/* Instruction text description */}
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

                    {/* Rick and Morty image, also closes the popup on click */}
                    <img
                        src={rickAndMorty}
                        alt="Rick and Morty Illustration"
                        onClick={handleClick}
                        className="rick-and-morty"
                    />
                </div>
            )}
        </>
    );
}
