import { useRef, useState } from 'react';
import buttonClickSfx from './assets/button-click.wav';
import rickAndMorty from './assets/rick-and-morty.png';
import instructionIcon from './assets/show-instruction.png';
import closeIcon from './assets/close.png';

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
                <img
                    src={isInstructionVisible ? closeIcon : instructionIcon}
                    className={
                        isInstructionVisible
                            ? 'close-instruction-button-icon'
                            : 'instruction-button-icon'
                    }
                />
            </button>
            {isInstructionVisible && (
                <div className="instruction-container">
                    <div className="instruction">
                        <button
                            className="close-instruction-button"
                            onClick={handleClick}
                        >
                            <img
                                src={closeIcon}
                                className="close-instruction-button-icon"
                            />
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
