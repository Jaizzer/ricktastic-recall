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
                        <p>
                            Wubba Lubba Dub-Dub! Welcome to Rickstatic Recall!
                        </p>
                        <p>
                            Flip a card, one at a time. Don’t be a dummy and
                            click the same card twice, okay?
                        </p>
                        <p>
                            Keep track of your score, and if you’re not
                            improving, well… maybe this game isn’t for you. Just
                            kidding. Or am I? Now, go show me what that big ol’
                            brain of yours can do. Good luck… you’re gonna need
                            it!
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
