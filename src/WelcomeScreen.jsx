export default function WelcomeScreen({ onNext }) {
  return (
    <div className="welcome">
      <div className="welcome-image-placeholder">
        {/* Replace this div with an <img> tag when you have the image ready */}
        <span className="welcome-image-emoji">🍷</span>
      </div>
      <div className="welcome-text">
        <p>
          Since we can't bring Wanda around the world for a wine tour, we are
          bringing the world to Wanda—wine and charcuterie themed of course 🍷🍇🧀
        </p>
        <button className="btn-start" onClick={onNext}>Let's go →</button>
      </div>
    </div>
  )
}
