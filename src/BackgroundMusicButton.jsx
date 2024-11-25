import { useRef, useState } from 'react';
import backgroundMusic from './assets/background-music.mp3';

export default function BackgroundMusicButton() {
    const [isPlaying, setIsPlaying] = useState(false);
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
                {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
            <audio
                ref={backgroundMusicRef}
                src={backgroundMusic}
                loop={true}
                preload="auto"
                autoPlay={false}
            ></audio>
        </>
    );
}
