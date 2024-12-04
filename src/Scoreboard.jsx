export default function Scoreboard({ currentScore, highScore }) {
    return (
        // Container for the scoreboard
        <div className="scoreboard">
            {/* Score slot for high score */}
            <div className="score-slot">
                <div className="title">High Score</div>
                {/* Display the high score, default to 0 if not provided */}
                <div className="value">{highScore ?? 0}</div>
            </div>

            {/* Score slot for current score */}
            <div className="score-slot">
                <div className="title">Current Score</div>
                {/* Display the current score, default to 0 if not provided */}
                <div className="value">{currentScore ?? 0}</div>
            </div>
        </div>
    );
}
