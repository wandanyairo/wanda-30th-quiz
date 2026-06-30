export default function WelcomeScreen({ onNext }) {
  return (
    <div className="welcome">
      <div className="welcome-header">
        <h1>
          Wanda's Worldwide Wine Tours™
          <span className="title-divider"> ~ </span>
          The Quiz <span className="welcome-year">2026</span>
        </h1>
      </div>
      <div className="welcome-image-placeholder">
        {/* Replace this div with an <img> tag when you have the image ready */}
        <span className="welcome-image-emoji">🍷</span>
      </div>
      <div className="welcome-text">
        <p>
          Since we can't bring Wanda around the world for a wine tour, we are
          bringing the world and the wine to Wanda 🍷🍇🧀
        </p>
        <button className="btn-start" onClick={onNext}>Let's Go →</button>
      </div>
    </div>
  )
}
