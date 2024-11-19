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
