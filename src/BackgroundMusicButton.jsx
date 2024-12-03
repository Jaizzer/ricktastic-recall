import { useEffect, useRef, useState } from 'react';
import backgroundMusic from './assets/background-music.mp3';
import buttonClickSfx from './assets/button-click.wav';
import musicOnIcon from './assets/music-on.png'
import musicOffIcon from './assets/music-off.png'

export default function BackgroundMusicButton({ areSfxEnabled }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const backgroundMusicRef = useRef(new Audio(backgroundMusic));

    const buttonClickSfxRef = useRef(new Audio(buttonClickSfx));

    function handleClick() {
        // Play button sound fx if sfx are enabled
        if (areSfxEnabled) {
            buttonClickSfxRef.current.play();
        }

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
            <button className="bg-music-switch" onClick={handleClick}>
                <img src={isPlaying ? musicOnIcon : musicOffIcon} className='music-button-icon'/>
            </button>
        </>
    );
}
