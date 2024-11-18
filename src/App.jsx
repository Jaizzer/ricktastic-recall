import { useEffect } from 'react';
import { useState } from 'react';

export default function App() {
    const [characters, setCharacters] = useState(null);

    // Obtain randomized IDs of characters to be fetched
    const characterCount = 25;
    const randomizedIDs = Array.from({ length: characterCount }, () =>
        Math.floor(Math.random() * 800)
    );

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then((response) => response.json())
            .then((data) => setCharacters(data.results));
    }, []);
    
    return <div></div>;
}
