import { useState } from 'react';

export default function Deck({ characters }) {
    const [cards, setCards] = useState(null);
    
    // Create cards on first render
    if (cards === null) {
        setCards(
            characters.map((character) => {
                const imageUrl = character.image;
                return <Card imageUrl={imageUrl} key={character.id}></Card>;
            })
        );
    }
    return <div className="deck">{cards}</div>;
}

function Card({ imageUrl }) {
    return (
        <div className="card">
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
