import { useRef, useState } from 'react';
import backgroundMusic from './assets/background-music.mp3';

export default function SoundFXButton() {
    const [isPlaying, setIsPlaying] = useState(true);
    const backgroundMusicRef = useRef(null);

    function handleClick() {
        if (backgroundMusicRef.current.paused) {
            backgroundMusicRef.current.play();
            setIsPlaying(true);
        } else {
            backgroundMusicRef.current.pause();
            setIsPlaying(false);
        }
    }

    return (
        <>
            <button
                className="bg-music-switch"
                onClick={handleClick}
            >
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <audio
                ref={backgroundMusicRef}
                src={backgroundMusic}
                loop={true}
                preload="auto"
                autoPlay={true}
            ></audio>
        </>
    );
}
