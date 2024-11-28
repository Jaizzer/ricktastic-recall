import { useEffect, useState } from 'react';
import Scoreboard from './Scoreboard';

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

        // Update the currentCharacters state
        setCurrentCharacters([...shuffleArray(currentCharacters)]);
    }

    // Create cards
    const cards = currentCharacters.map((currentCharacter) => {
        const imageUrl = currentCharacter.image;
        return (
            <Card
                imageUrl={imageUrl}
                key={currentCharacter.id}
                onClick={() => {
                    updatePlayArea(currentCharacter.id);
                }}
            ></Card>
        );
    });

    // Display a Victory or Game Over message depending on the user's score.
    let popUpMessage;
    if (highScore !== 0 && currentScore === null) {
        popUpMessage = (
            <div className="pop-up-message">
                <div className="message">Game Over</div>
                <button className="restart" onClick={requestNewCharacters}>
                    Restart
                </button>
                <button className="menu" onClick={goBackToMenu}>
                    Back to Menu
                </button>
            </div>
        );
    } else if (currentScore === currentCharacters.length) {
        popUpMessage = (
            <div className="pop-up-message">
                <div className="message">Victory</div>
                <button className="restart" onClick={requestNewCharacters}>
                    Restart
                </button>
                <button className="menu" onClick={goBackToMenu}>
                    Back to Menu
                </button>
            </div>
        );
    }

    return (
        <div className="play-area">
            {popUpMessage}
            <Scoreboard
                currentScore={currentScore}
                highScore={highScore}
            ></Scoreboard>
            <div className="deck">{cards}</div>
        </div>
    );
}

function Card({ imageUrl, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <img src={imageUrl} />
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
