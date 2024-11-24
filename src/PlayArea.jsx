import { useState } from 'react';
import Scoreboard from './Scoreboard';

export default function PlayArea({ newCharacters }) {
    const [cardCharacters, setCardCharacters] = useState(
        newCharacters.map((newCharacter) => {
            // Add click count property
            return { ...newCharacter, clickCount: 0 };
        })
    );

    const [highScore, setHighScore] = useState(0);

    function updatePlayArea(cardId) {
        // Find the object corresponding to the clicked card
        const correspondingObjectOfTheClickedCard = cardCharacters.find(
            (cardCharacter) => cardCharacter.id === cardId
        );

        // Increment the card's click count through the corresponding object
        correspondingObjectOfTheClickedCard.clickCount++;

        // Update if the high score is beaten
        const currentScore = getCurrentScore(cardCharacters);
        if (highScore < currentScore) {
            setHighScore(currentScore);
        }

        // Update the cardCharacters state
        setCardCharacters([...shuffleArray(cardCharacters)]);
    }

    // Create cards
    const cards = cardCharacters.map((cardCharacter) => {
        const imageUrl = cardCharacter.image;
        return (
            <Card
                imageUrl={imageUrl}
                key={cardCharacter.id}
                onClick={() => {
                    updatePlayArea(cardCharacter.id);
                }}
            ></Card>
        );
    });

    // Display a Victory or Game Over message depending on the user's score.
    let popUpMessage;
    if (highScore !== 0 && getCurrentScore(cardCharacters) === 0) {
        popUpMessage = (
            <div className="pop-up-message">
                <div className="message">Game Over</div>
                <button className="restart">Restart</button>
                <button className="menu">Back to Menu</button>
            </div>
        );
    } else if (getCurrentScore(cardCharacters) === cardCharacters.length) {
        popUpMessage = (
            <div className="pop-up-message">
                <div className="message">Victory</div>
                <button className="restart">Restart</button>
                <button className="menu">Back to Menu</button>
            </div>
        );
    }

    return (
        <div className="play-area">
            {popUpMessage}
            <Scoreboard
                currentScore={getCurrentScore(cardCharacters)}
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

function getCurrentScore(cardCharacters) {
    return (
        cardCharacters.reduce((accumulator, cardCharacter) => {
            if (accumulator === null) return null;
            if (cardCharacter.clickCount >= 2) return null;
            return accumulator + cardCharacter.clickCount;
        }, 0) ?? 0
    );
}
