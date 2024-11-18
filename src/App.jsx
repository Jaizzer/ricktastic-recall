import { useEffect } from 'react';
import { useState } from 'react';

export default function App() {
    const [characters, setCharacters] = useState(null);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then((response) => response.json())
            .then((data) => setCharacters(data.results));
    }, []);
    
    return <div></div>;
}
