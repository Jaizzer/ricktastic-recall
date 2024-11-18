import { useEffect } from 'react';
import { useState } from 'react';

export default function App() {
    const [characters, setCharacters] = useState(null);

    useEffect(() => {
        // Obtain randomized IDs of characters to be fetched
        const characterCount = 25;
        const randomizedIDs = Array.from({ length: characterCount }, () =>
            Math.floor(Math.random() * 800)
        );

        // Build the link
        const link =
            'https://rickandmortyapi.com/api/character/' +
            `[${randomizedIDs}]/`;

        fetch(link)
            .then((response) => response.json())
            .then((data) => setCharacters(data.results));
    }, []);
    
    return <div></div>;
}
