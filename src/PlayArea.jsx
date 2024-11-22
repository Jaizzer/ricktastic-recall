import { useState } from 'react';

export default function Deck({ characters }) {
    const [cardCharacters, setCardCharacters] = useState(
        characters.map((character) => {
            // Add click count property
            return { ...character, clickCount: 0 };
        })
    );

    const [highScore, setHighScore] = useState(0);

    function updateDeck(cardId) {
        // Find the object corresponding to the clicked card
        const correspondingObjectOfTheClickedCard = cardCharacters.find(
            (cardCharacter) => cardCharacter.id === cardId
        );

        // Increment the card's click count through the corresponding object
        correspondingObjectOfTheClickedCard.clickCount++;

        // Update the cardCharacters state
        setCardCharacters([...shuffleArray(cardCharacters)]);
    }

    // Create cards
    const cards = cardCharacters.map((cardCharacters) => {
        const imageUrl = cardCharacters.image;
        return (
            <Card
                imageUrl={imageUrl}
                key={cardCharacters.id}
                onClick={() => {
                    updateDeck(cardCharacters.id);
                }}
            ></Card>
        );
    });

    return (
        <div className="play-area">
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
