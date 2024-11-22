export default function Scoreboard({ currentScore, highScore }) {
    return (
        <div className="scoreboard">
            <div className="current-score">Current Score: {currentScore}</div>
            <div className="high-score">High Score: {highScore}</div>
        </div>
    );
}
