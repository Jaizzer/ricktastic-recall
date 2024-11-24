import backgroundMusic from './assets/background-music.mp3';

export default function SoundFXButton() {
    return (
        <audio
            src={backgroundMusic}
            loop="true"
            preload="auto"
            autoPlay="true"
        ></audio>
    );
}
