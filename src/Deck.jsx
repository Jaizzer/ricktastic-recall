import { useState } from 'react';

export default function Deck({ characters }) {
    const [cardCharacters, setCardCharacters] = useState(
        characters.map((character) => {
            // Add click count property
            return { ...character, clickCount: 0 };
        })
    );

    function shuffleCharacters() {
        setCardCharacters([...shuffleArray(cardCharacters)]);
    }

    // Create cards
    const cards = cardCharacters.map((cardCharacters) => {
        const imageUrl = cardCharacters.image;
        return (
            <Card
                imageUrl={imageUrl}
                key={cardCharacters.id}
                onClick={shuffleCharacters}
            ></Card>
        );
    });

    return <div className="deck">{cards}</div>;
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
