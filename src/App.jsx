import { useState } from 'react';
import HomeButton from './HomeButton';
import PlayArea from './PlayArea';
import SoundFXButton from './SoundFxButton';
import Instruction from './Instruction';

export default function App() {
    const [characters, setCharacters] = useState(null);

    function handleDifficultyClick(event) {
        // Access the clicked difficulty button
        const clickedDifficultyButton = event.target;

        // Access the parent of clicked difficulty button
        const parentOfClickedDifficultyButton =
            clickedDifficultyButton.parentElement;

        // Access all the children of the parent of clicked difficulty button
        const childrenOfParentOfClickedDifficultyButton = Array.from(
            parentOfClickedDifficultyButton.children
        );

        // Determine the index of the clicked difficulty button
        const indexOfClickedDifficultyButton =
            childrenOfParentOfClickedDifficultyButton.indexOf(
                clickedDifficultyButton
            );

        // Determine the number of cards to show base on the index of the clicked diffulty button
        const numberOfCardsToShow = (indexOfClickedDifficultyButton + 1) * 5;

        // Get the chracters
        getCharacters(numberOfCardsToShow);
    }

    function getCharacters(numberOfCardsToShow) {
        // Obtain randomized IDs of characters to be fetched
        const randomizedIDs = Array.from({ length: numberOfCardsToShow }, () =>
            Math.floor(Math.random() * 800)
        );

        // Build the link
        const link =
            'https://rickandmortyapi.com/api/character/' +
            `[${randomizedIDs}]/`;

        fetch(link)
            .then((response) => response.json())
            .then((data) => {
                // Ensure that the right number of data was received
                if (data.length === numberOfCardsToShow) {
                    setCharacters(data);
                } else {
                    getCharacters(numberOfCardsToShow)
                }
            });
    }

    if (characters) {
        return (
            <>
                <HomeButton
                    handleClick={() => setCharacters(null)}
                ></HomeButton>
                <PlayArea
                    newCharacters={characters}
                    requestNewCharacters={() =>
                        getCharacters(characters.length)
                    }
                    goBackToMenu={() => setCharacters(null)}
                ></PlayArea>
                <SoundFXButton></SoundFXButton>
                <Instruction></Instruction>
            </>
        );
    } else {
        return (
            <>
                <HomeButton
                    handleClick={() => setCharacters(null)}
                ></HomeButton>
                <div className="difficulty-selector">
                    <button
                        className="difficulty-button"
                        onClick={handleDifficultyClick}
                    >
                        Meeseeks
                    </button>
                    <button
                        className="difficulty-button"
                        onClick={handleDifficultyClick}
                    >
                        Schiwfty
                    </button>
                    <button
                        className="difficulty-button"
                        onClick={handleDifficultyClick}
                    >
                        Gazorpazorp
                    </button>
                    <button
                        className="difficulty-button"
                        onClick={handleDifficultyClick}
                    >
                        Interdimensional
                    </button>
                    <button
                        className="difficulty-button"
                        onClick={handleDifficultyClick}
                    >
                        EvilMorty
                    </button>
                </div>
                <SoundFXButton></SoundFXButton>
                <Instruction></Instruction>
            </>
        );
    }
}
