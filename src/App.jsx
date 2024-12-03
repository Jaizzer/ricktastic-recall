import { useRef, useState } from 'react';
import HomeButton from './HomeButton';
import PlayArea from './PlayArea';
import BackgroundMusicButton from './BackgroundMusicButton';
import Instruction from './Instruction';
import buttonClickSfx from './assets/button-click.wav';

export default function App() {
    const [characters, setCharacters] = useState(null);
    const [areSfxEnabled, setAreSfxEnabled] = useState(true);

    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));

    function toggleSfx() {
        if (areSfxEnabled) {
            setAreSfxEnabled(false);
        } else {
            setAreSfxEnabled(true);
        }
    }

    function handleDifficultyClick(numberOfCardsToShow) {
        // Play button click sound if sfx are enabled
        if (areSfxEnabled) {
            buttonClickSfxRef.current.play();
        }

        // Get the chracters
        getCharacters(numberOfCardsToShow);
    }

    function getCharacters(numberOfCardsToShow) {
        // Obtain randomized IDs of characters to be fetched
        const randomizedIDs = Array.from({ length: numberOfCardsToShow }, () =>
            Math.floor(Math.random() * 800)
        );

        // Build the link
        const link =
            'https://rickandmortyapi.com/api/character/' +
            `[${randomizedIDs}]/`;

        fetch(link)
            .then((response) => response.json())
            .then((data) => {
                // Ensure that the right number of data was received
                if (data.length === numberOfCardsToShow) {
                    setCharacters(data);
                } else {
                    getCharacters(numberOfCardsToShow);
                }
            });
    }

    const utilityButtonsContainer = (
        <div className="utility-buttons-container">
            <BackgroundMusicButton
                areSfxEnabled={areSfxEnabled}
            ></BackgroundMusicButton>
            <button
                className="sf-music-switch"
                onClick={() => {
                    // Play button click sound if sfx are enabled
                    if (areSfxEnabled) {
                        buttonClickSfxRef.current.play();
                    }
                    toggleSfx();
                }}
            >
                {areSfxEnabled ? 'Disable SFX' : 'Enable SFX'}
            </button>
            <Instruction areSfxEnabled={areSfxEnabled}></Instruction>
        </div>
    );

    const difficultySelector = (
        <div className="difficulty-selector">
            <button
                className="difficulty-button"
                onClick={() => {
                    handleDifficultyClick(10);
                }}
            >
                Meeseeks
            </button>
            <button
                className="difficulty-button"
                onClick={() => {
                    handleDifficultyClick(15);
                }}
            >
                Schiwfty
            </button>
            <button
                className="difficulty-button"
                onClick={() => {
                    handleDifficultyClick(20);
                }}
            >
                Gazorpazorp
            </button>
            <button
                className="difficulty-button"
                onClick={() => {
                    handleDifficultyClick(25);
                }}
            >
                Interdimensional
            </button>
            <button
                className="difficulty-button"
                onClick={() => {
                    handleDifficultyClick(30);
                }}
            >
                EvilMorty
            </button>
        </div>
    );

    if (characters) {
        return (
            <>
                <HomeButton
                    goToHome={() => {
                        setCharacters(null);
                    }}
                ></HomeButton>
                <PlayArea
                    newCharacters={characters}
                    requestNewCharacters={() =>
                        getCharacters(characters.length)
                    }
                    goBackToMenu={() => setCharacters(null)}
                    areSfxEnabled={areSfxEnabled}
                ></PlayArea>
                {utilityButtonsContainer}
            </>
        );
    } else {
        // Render Homepage
        return (
            <>
                <div className="welcome">
                    <HomeButton
                        goToHome={() => {
                            setCharacters(null);
                        }}
                    ></HomeButton>
                    {difficultySelector}
                    {utilityButtonsContainer}
                </div>
            </>
        );
    }
}
