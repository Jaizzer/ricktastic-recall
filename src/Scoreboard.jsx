export default function Scoreboard({ currentScore, highScore }) {
    return (
        <div className="scoreboard">
            <div className="score-slot">
                <div className="title">High Score</div>
                <div className="value">{highScore ?? 0}</div>
            </div>
            <div className="score-slot">
                <div className="title">Current Score</div>
                <div className="value">{currentScore ?? 0}</div>
            </div>
        </div>
    );
}
