export default function Scoreboard({ currentScore, highScore }) {
    return (
        <div className="scoreboard">
            <div className="current-score">Current Score: {currentScore ?? 0}</div>
            <div className="high-score">High Score: {highScore}</div>
        </div>
    );
}
