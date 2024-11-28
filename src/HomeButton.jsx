export default function HomeButton({ goToHome, areSfxEnabled }) {
    return (
        <div className="home-button" onClick={goToHome}>
            <img src="" alt="Home" className="home-button-icon"></img>
            <div className="home-button-text">Memory Quest</div>
        </div>
    );
}
