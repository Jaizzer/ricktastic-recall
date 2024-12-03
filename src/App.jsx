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

    function handleDifficultyClick(event) {
        // Play button click sound if sfx are enabled
        if (areSfxEnabled) {
            buttonClickSfxRef.current.play();
        }

        // Access the clicked difficulty button
        const clickedDifficultyButton = event.target;

        // Access the parent of clicked difficulty button
        const parentOfClickedDifficultyButton =
            clickedDifficultyButton.parentElement;

        // Access all the children of the parent of clicked difficulty button
        const childrenOfParentOfClickedDifficultyButton = Array.from(
            parentOfClickedDifficultyButton.children
        );

        // Determine the index of the clicked difficulty button
        const indexOfClickedDifficultyButton =
            childrenOfParentOfClickedDifficultyButton.indexOf(
                clickedDifficultyButton
            );

        // Determine the number of cards to show base on the index of the clicked diffulty button
        const numberOfCardsToShow = (indexOfClickedDifficultyButton + 1) * 5;

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
        <div className='utility-buttons-container'>
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

    let mainContent;
    if (characters) {
        mainContent = (
            <PlayArea
                newCharacters={characters}
                requestNewCharacters={() => getCharacters(characters.length)}
                goBackToMenu={() => setCharacters(null)}
                areSfxEnabled={areSfxEnabled}
            ></PlayArea>
        );

        return (
            <>
                <HomeButton
                    goToHome={() => {
                        setCharacters(null);
                    }}
                ></HomeButton>
                <div className="main-content">{mainContent}</div>
                {utilityButtonsContainer}
            </>
        );
    } else {
        mainContent = (
            <div className="difficulty-selector">
                <button
                    className="difficulty-button"
                    onClick={handleDifficultyClick}
                >
                    Meeseeks
                </button>
                <button
                    className="difficulty-button"
                    onClick={handleDifficultyClick}
                >
                    Schiwfty
                </button>
                <button
                    className="difficulty-button"
                    onClick={handleDifficultyClick}
                >
                    Gazorpazorp
                </button>
                <button
                    className="difficulty-button"
                    onClick={handleDifficultyClick}
                >
                    Interdimensional
                </button>
                <button
                    className="difficulty-button"
                    onClick={handleDifficultyClick}
                >
                    EvilMorty
                </button>
            </div>
        );
        return (
            <>
                <div className="main-content">
                    <HomeButton
                        goToHome={() => {
                            setCharacters(null);
                        }}
                    ></HomeButton>
                    {mainContent}
                </div>
                {utilityButtonsContainer}
            </>
        );
    }
}
