import { useRef, useEffect, useState } from 'react';
import Scoreboard from './Scoreboard';
import cardSlideSfx from './assets/card-slide.wav';
import gameOverSfx from './assets/game-over.wav';
import buttonClickSfx from './assets/button-click.wav';
import victorySfx from './assets/victory.wav';
import portalImageUrl from './assets/portal.jpg';
import shuffleIcon from './assets/shuffle.png';
import defeatImage from './assets/defeat.jpg';
import victoryImage from './assets/victory.jpg';

export default function PlayArea({
    newCharacters, // Array of new character objects
    requestNewCharacters, // Function to request a new set of characters
    goBackToMenu, // Function to navigate back to the menu
    areSfxEnabled, // Boolean to toggle sound effects
}) {
    // State to manage the characters displayed in the game
    const [currentCharacters, setCurrentCharacters] = useState(
        newCharacters.map((newCharacter) => ({
            ...newCharacter,
            clickCount: 0, // Add clickCount to track card clicks
        }))
    );

    // Sound effects references to avoid re-instantiating audio on every render
    const cardSlideSfxRef = useRef(new Audio(cardSlideSfx));
    const gameOverSfxRef = useRef(new Audio(gameOverSfx));
    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));

    // Play card slide sound if sound effects are enabled
    if (areSfxEnabled) {
        cardSlideSfxRef.current.play();
    }

    // Update currentCharacters whenever newCharacters prop changes
    useEffect(() => {
        setCurrentCharacters(
            newCharacters.map((newCharacter) => ({
                ...newCharacter,
                clickCount: 0, // Reset click count for new game
            }))
        );
    }, [newCharacters]);

    // State to track the high score
    const [highScore, setHighScore] = useState(0);

    // Compute the current score based on the click counts of the characters
    let currentScore = getCurrentScore(currentCharacters);

    // Function to handle card click updates
    function updatePlayArea(cardId) {
        // Find the card that was clicked
        const correspondingCard = currentCharacters.find(
            (character) => character.id === cardId
        );

        // Increment the click count for the clicked card
        correspondingCard.clickCount++;

        // Calculate the score for the next render
        const nextScore = getCurrentScore(currentCharacters);

        // Update high score if the current score exceeds it
        if (highScore < nextScore) {
            setHighScore(nextScore);
        }

        // Play game over sound if a card is clicked twice
        if (getCurrentScore(currentCharacters) === null && areSfxEnabled) {
            gameOverSfxRef.current.play();
        }

        // Play victory sound if all cards are clicked correctly
        if (nextScore === currentCharacters.length && areSfxEnabled) {
            new Audio(victorySfx).play();
        }

        // Increment the keys of all characters to force a render
        let charactersWithIncrementedKey = currentCharacters.map(
            (currentCharacter) => {
                return { ...currentCharacter, id: currentCharacter.id + 1 };
            }
        );

        // Shuffle cards and update the state
        setCurrentCharacters([...shuffleArray(charactersWithIncrementedKey)]);
    }

    // Generate cards for the play area
    const numberOfCardsToShow = 5;
    const cards = [];
    for (let i = 0; i < numberOfCardsToShow; i++) {
        const currentCharacter = currentCharacters[i];
        cards.push(
            <Card
                imageUrl={currentCharacter.image}
                key={currentCharacter.id}
                onClick={() => updatePlayArea(currentCharacter.id)}
            />
        );
    }

    // Determine if the game is over or won
    const gameIsLost = currentScore === null;
    const gameIsWon = currentScore === currentCharacters.length;
    const gameEnded = gameIsLost || gameIsWon;

    // Conditionally render the victory or game-over message
    let popUpMessage;
    if (gameEnded) {
        const message = gameIsWon ? 'Victory' : 'You Lost';
        popUpMessage = (
            <div className="pop-up-message">
                <img
                    src={gameIsWon ? victoryImage : defeatImage}
                    className="pop-up-message-background"
                />
                <div className="message">{message}</div>
                <div className="actions">
                    <button
                        className="restart"
                        onClick={() => {
                            if (areSfxEnabled) {
                                buttonClickSfxRef.current.play();
                            }
                            requestNewCharacters();
                        }}
                    >
                        Restart
                    </button>
                    <button
                        className="menu"
                        onClick={() => {
                            if (areSfxEnabled) {
                                buttonClickSfxRef.current.play();
                            }
                            goBackToMenu();
                        }}
                    >
                        Back to Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="play-area">
            {gameEnded ? (
                popUpMessage
            ) : (
                <>
                    <Scoreboard
                        currentScore={currentScore}
                        highScore={highScore}
                    />
                    <button
                        className="shuffler"
                        onClick={() => {
                            // Inrement the character id to force rerender on all cards
                            let charactersWithIncrementedKey =
                                currentCharacters.map((currentCharacter) => {
                                    return {
                                        ...currentCharacter,
                                        id: currentCharacter.id + 1,
                                    };
                                });

                            // Shuffle the characters
                            setCurrentCharacters([
                                ...shuffleArray(charactersWithIncrementedKey),
                            ]);
                        }}
                    >
                        <img
                            src={shuffleIcon}
                            className="shuffle-button-icon"
                        />
                        Shuffle Cards
                    </button>
                    <div className="deck">{cards}</div>
                    <div className="tracker">
                        {currentScore} / {currentCharacters.length}
                    </div>
                </>
            )}
        </div>
    );
}

// Card component for displaying individual cards
function Card({ imageUrl, onClick }) {
    return (
        <div className="container">
            <div className="card" onClick={onClick}>
                <img className="front" src={imageUrl} />
                <img className="back" src={portalImageUrl} />
            </div>
        </div>
    );
}

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

// Function to calculate the current score based on the click count
function getCurrentScore(currentCharacters) {
    return currentCharacters.reduce((accumulator, character) => {
        if (accumulator === null) return null; // Game over if a card is clicked twice
        if (character.clickCount >= 2) return null;
        return accumulator + character.clickCount; // Accumulate valid clicks
    }, 0);
}
