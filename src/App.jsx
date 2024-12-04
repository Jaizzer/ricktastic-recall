import { useRef, useState } from 'react';
import BackgroundMusicButton from './BackgroundMusicButton';
import PlayArea from './PlayArea';
import HomeButton from './HomeButton';
import buttonClickSfx from './assets/button-click.wav';
import soundOffIcon from './assets/sound-off.png';
import soundOnIcon from './assets/sound-on.png';
import backgroundMusic from './assets/background-music.mp3';
import Instruction from './Instruction';

export default function App() {
    const [characters, setCharacters] = useState(null);
    const [areSfxEnabled, setAreSfxEnabled] = useState(true);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Track music state
    const backgroundMusicRef = useRef(new Audio(backgroundMusic));

    // Button click sound effect ref
    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));

    // Toggle music play/pause
    function toggleMusic() {
        if (isMusicPlaying) {
            backgroundMusicRef.current.pause();
        } else {
            backgroundMusicRef.current.play();
        }
        setIsMusicPlaying(!isMusicPlaying);
    }

    // Stop background music when navigating between pages
    function stopMusic() {
        backgroundMusicRef.current.pause();
        setIsMusicPlaying(false);
    }

    function handleDifficultyClick(numberOfCardsToShow) {
        if (areSfxEnabled) {
            buttonClickSfxRef.current.play();
        }
        getCharacters(numberOfCardsToShow);
    }

    function getCharacters(numberOfCardsToShow) {
        const randomizedIDs = Array.from({ length: numberOfCardsToShow }, () =>
            Math.floor(Math.random() * 800)
        );

        const link =
            'https://rickandmortyapi.com/api/character/' +
            `[${randomizedIDs}]/`;

        fetch(link)
            .then((response) => response.json())
            .then((data) => {
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
                isMusicPlaying={isMusicPlaying}
                toggleMusic={toggleMusic}
            />
            <button
                className="sf-music-switch"
                onClick={() => {
                    if (areSfxEnabled) {
                        buttonClickSfxRef.current.play();
                    }
                    setAreSfxEnabled(!areSfxEnabled);
                }}
            >
                <img
                    src={areSfxEnabled ? soundOnIcon : soundOffIcon}
                    className="sound-button-icon"
                />
            </button>
            <Instruction areSfxEnabled={areSfxEnabled}></Instruction>
        </div>
    );

    if (characters) {
        return (
            <>
                <div className="playing-page">
                    <HomeButton
                        goToHome={() => {
                            setCharacters(null);
                            stopMusic(); // Stop music when going back to home
                        }}
                    />
                    <PlayArea
                        newCharacters={characters}
                        requestNewCharacters={() =>
                            getCharacters(characters.length)
                        }
                        goBackToMenu={() => {
                            setCharacters(null);
                            stopMusic(); // Stop music when going back to home
                        }}
                        areSfxEnabled={areSfxEnabled}
                    />
                </div>
                {utilityButtonsContainer}
            </>
        );
    } else {
        return (
            <>
                <div className="home">
                    <div className="welcome">
                        <HomeButton
                            goToHome={() => {
                                setCharacters(null);
                                stopMusic(); // Stop music when going to home
                            }}
                        />
                        <div className="difficulty-selector">
                            <button onClick={() => handleDifficultyClick(5)}>
                                Meeseeks
                            </button>
                            <button onClick={() => handleDifficultyClick(10)}>
                                Schiwfty
                            </button>
                            <button onClick={() => handleDifficultyClick(15)}>
                                Gazorpazorp
                            </button>
                            <button onClick={() => handleDifficultyClick(25)}>
                                Interdimensional
                            </button>
                            <button onClick={() => handleDifficultyClick(50)}>
                                EvilMorty
                            </button>
                        </div>
                    </div>
                </div>
                {utilityButtonsContainer}
            </>
        );
    }
}
