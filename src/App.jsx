import { useRef, useState } from 'react';
import HomeButton from './HomeButton';
import PlayArea from './PlayArea';
import BackgroundMusicButton from './BackgroundMusicButton';
import Instruction from './Instruction';
import buttonClickSfx from './assets/button-click.wav';
import soundOffIcon from './assets/sound-off.png';
import soundOnIcon from './assets/sound-on.png';

export default function App() {
    // State to track characters loaded for the game
    const [characters, setCharacters] = useState(null);

    // State to enable or disable sound effects (SFX)
    const [areSfxEnabled, setAreSfxEnabled] = useState(true);

    // State to display the current difficulty level when hovering over buttons
    const [difficultyToDisplay, setDifficultyToDisplay] = useState(null);

    // Reference to the button click SFX audio to prevent re-instantiation
    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));

    // Toggle the SFX on or off
    function toggleSfx() {
        setAreSfxEnabled((prev) => !prev);
    }

    // Handle difficulty button click, fetching the required number of characters
    function handleDifficultyClick(numberOfCardsToShow) {
        // Play button click SFX if enabled
        if (areSfxEnabled) {
            buttonClickSfxRef.current.play();
        }

        // Fetch characters based on the selected difficulty
        getCharacters(numberOfCardsToShow);
    }

    // Fetch characters from the Rick and Morty API
    function getCharacters(numberOfCardsToShow) {
        // Generate randomized IDs for characters
        const randomizedIDs = Array.from({ length: numberOfCardsToShow }, () =>
            Math.floor(Math.random() * 800)
        );

        // Construct the API URL with the generated IDs
        const link =
            'https://rickandmortyapi.com/api/character/' +
            `[${randomizedIDs}]/`;

        // Fetch characters from the API
        fetch(link)
            .then((response) => response.json())
            .then((data) => {
                // Ensure the correct number of characters are received
                if (data.length === numberOfCardsToShow) {
                    setCharacters(data);
                } else {
                    // Retry fetching if the data count is incorrect
                    getCharacters(numberOfCardsToShow);
                }
            });
    }

    // Utility buttons container, including SFX toggle and instructions
    const utilityButtonsContainer = (
        <div className="utility-buttons-container">
            <BackgroundMusicButton areSfxEnabled={areSfxEnabled} />
            <button
                className="sf-music-switch"
                onClick={() => {
                    // Play button click SFX if enabled
                    if (areSfxEnabled) {
                        buttonClickSfxRef.current.play();
                    }
                    toggleSfx();
                }}
            >
                <img
                    src={areSfxEnabled ? soundOnIcon : soundOffIcon}
                    className="sound-button-icon"
                />
            </button>
            <Instruction areSfxEnabled={areSfxEnabled} />
        </div>
    );

    // Difficulty selector buttons to choose the number of cards
    const difficultySelector = (
        <div className="difficulty-selector">
            {[
                { label: 'Meeseeks', value: 5 },
                { label: 'Schiwfty', value: 10 },
                { label: 'Gazorpazorp', value: 15 },
                { label: 'Interdimensional', value: 25 },
                { label: 'EvilMorty', value: 50 },
            ].map(({ label, value }) => (
                <button
                    className="difficulty-button"
                    onClick={() => handleDifficultyClick(value)}
                    onMouseEnter={() => setDifficultyToDisplay(value)}
                    onMouseLeave={() => setDifficultyToDisplay(null)}
                    key={label}
                >
                    {label}
                </button>
            ))}
        </div>
    );

    // If characters are loaded, render the game play area
    if (characters) {
        return (
            <>
                <div className="playing-page">
                    <HomeButton goToHome={() => setCharacters(null)} />
                    <PlayArea
                        newCharacters={characters}
                        requestNewCharacters={() =>
                            getCharacters(characters.length)
                        }
                        goBackToMenu={() => setCharacters(null)}
                        areSfxEnabled={areSfxEnabled}
                    />
                </div>
                {utilityButtonsContainer}
            </>
        );
    } else {
        // Render the homepage with difficulty selection and utility buttons
        return (
            <>
                <div className="home">
                    <div className="welcome">
                        <HomeButton goToHome={() => setCharacters(null)} />
                        {difficultySelector}
                        {difficultyToDisplay && (
                            <div className="difficulty-level">
                                {difficultyToDisplay} cards
                            </div>
                        )}
                    </div>
                </div>
                {utilityButtonsContainer}
            </>
        );
    }
}
