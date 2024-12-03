import { useRef, useEffect, useState } from 'react';
import Scoreboard from './Scoreboard';
import cardSlideSfx from './assets/card-slide.wav';
import gameOverSfx from './assets/game-over.wav';
import buttonClickSfx from './assets/button-click.wav';
import victorySfx from './assets/victory.wav';
import portalImageUrl from './assets/portal.jpg';

export default function PlayArea({
    newCharacters,
    requestNewCharacters,
    goBackToMenu,
    areSfxEnabled,
}) {
    const [currentCharacters, setCurrentCharacters] = useState(
        newCharacters.map((newCharacter) => {
            // Add click count property
            return { ...newCharacter, clickCount: 0 };
        })
    );

    // Save reference to the card slide sfx to prevent multiple instantiation on re-renders
    const cardSlideSfxRef = useRef(new Audio(cardSlideSfx));

    // Save reference to the game over sfx to prevent multiple instantiation on re-renders
    const gameOverSfxRef = useRef(new Audio(gameOverSfx));

    // Save reference to the click button sfx to prevent multiple instantiation on re-renders
    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));

    // Play card slide audio if SFX are enabled
    if (areSfxEnabled) {
        cardSlideSfxRef.current.play();
    }

    // Use the newly sent newCharacters prop as the currentCharacters
    useEffect(() => {
        setCurrentCharacters(
            newCharacters.map((newCharacter) => {
                // Add click count property
                return { ...newCharacter, clickCount: 0 };
            })
        );
    }, [newCharacters]);

    // Track high scores
    const [highScore, setHighScore] = useState(0);

    // Get current score
    let currentScore = getCurrentScore(currentCharacters);

    function updatePlayArea(cardId) {
        // Find the object corresponding to the clicked card
        const correspondingObjectOfTheClickedCard = currentCharacters.find(
            (currentCharacter) => currentCharacter.id === cardId
        );

        // Increment the card's click count through the corresponding object
        correspondingObjectOfTheClickedCard.clickCount++;

        // Calculate the currents score that would appear on the next render
        const nextRenderCurrentScore = getCurrentScore(currentCharacters);

        // Update if the high score is beaten by the next render current score
        if (highScore < nextRenderCurrentScore) {
            setHighScore(nextRenderCurrentScore);
        }

        // Play game over sound if player clicked a card twice
        if (getCurrentScore(currentCharacters) === null && areSfxEnabled) {
            gameOverSfxRef.current.play();
        }

        // Play victory sound if player won
        if (
            nextRenderCurrentScore === currentCharacters.length &&
            areSfxEnabled
        ) {
            new Audio(victorySfx).play();
        }

        // Update the currentCharacters state
        setCurrentCharacters([...shuffleArray(currentCharacters)]);
    }

    // Create cards
    let numberOfCardsToShow = 5;
    let cards = [];
    for (let i = 0; i < numberOfCardsToShow; i++) {
        let currentCharacter = currentCharacters[i];
        cards.push(
            <Card
                imageUrl={currentCharacter.image}
                key={Math.floor(Math.random() * 1000)}
                onClick={() => {
                    updatePlayArea(currentCharacter.id);
                }}
            ></Card>
        );
    }

    // Display a Victory or Game Over message depending on the user's score.
    let popUpMessage;
    const gameIsLost = currentScore === null;
    const gameIsWon = currentScore === currentCharacters.length;
    const gameEnded = gameIsLost || gameIsWon;
    if (gameEnded) {
        let message;
        if (gameIsWon) {
            message = 'Victory';
        } else if (gameIsLost) {
            message = 'You Lost';
        }

        popUpMessage = (
            <div className="pop-up-message">
                <div className="message">{message}</div>
                <button
                    className="restart"
                    onClick={() => {
                        // Play button sound fx if sfx are enabled
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
                        // Play button sound fx if sfx are enabled
                        if (areSfxEnabled) {
                            buttonClickSfxRef.current.play();
                        }
                        goBackToMenu();
                    }}
                >
                    Back to Menu
                </button>
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
                    ></Scoreboard>
                    <div className="deck">{cards}</div>
                    <div className="tracker">
                        {currentScore} / {currentCharacters.length}
                    </div>
                </>
            )}
        </div>
    );
}

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

function shuffleArray(array) {
    // Use array length to include the last element when generating random index
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        // Pick the remaining element
        let randomIndex = Math.floor(Math.random() * currentIndex);

        // Exclude the previously swapped element
        currentIndex--;

        // Swap elements
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

function getCurrentScore(currentCharacters) {
    return currentCharacters.reduce((accumulator, currentCharacter) => {
        if (accumulator === null) return null;
        if (currentCharacter.clickCount >= 2) return null;
        return accumulator + currentCharacter.clickCount;
    }, 0);
}
