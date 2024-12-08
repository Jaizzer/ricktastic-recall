import { useRef, useState } from 'react';
import backgroundMusic from './assets/background-music.mp3';
import buttonClickSfx from './assets/button-click.wav';
import musicOnIcon from './assets/music-on.png';
import musicOffIcon from './assets/music-off.png';

export default function BackgroundMusicButton({ areSfxEnabled }) {
    // State to track whether the background music is playing
    const [isPlaying, setIsPlaying] = useState(false);

    // Reference to the background music audio element
    const backgroundMusicRef = useRef(new Audio(backgroundMusic));
    backgroundMusicRef.current.loop = true; // Ensure the music loops when played

    // Reference to the button click sound effect
    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));

    // Handle button click event
    function handleClick() {
        // Play button click sound effect if SFX are enabled
        if (areSfxEnabled) {
            buttonClickSfxRef.current.play();
        }

        // Toggle the background music play/pause state
        if (backgroundMusicRef.current.paused) {
            backgroundMusicRef.current.play(); // Play music if paused
            setIsPlaying(true); // Update state to reflect music is playing
        } else {
            backgroundMusicRef.current.pause(); // Pause music if playing
            setIsPlaying(false); // Update state to reflect music is paused
        }
    }

    return (
        // Button to toggle background music
        <>
            <button className="bg-music-switch" onClick={handleClick}>
                {/* Display icon based on whether the music is playing */}
                <img
                    src={isPlaying ? musicOnIcon : musicOffIcon}
                    className="music-button-icon"
                />
            </button>
        </>
    );
}
