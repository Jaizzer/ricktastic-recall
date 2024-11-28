export default function HomeButton({ handleClick, areSfxEnabled }) {
    return (
        <div className="home-button" onClick={handleClick}>
            <img src="" alt="Home" className="home-button-icon"></img>
            <div className="home-button-text">Memory Quest</div>
        </div>
    );
}
