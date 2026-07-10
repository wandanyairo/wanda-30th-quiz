export default function WelcomeScreen({ onNext, insightsUnlocked }) {
  return (
    <div className="welcome">
      <div className="welcome-content">
        <div className="welcome-header">
          <h1>
            Wanda's Worldwide Wine Tours™
            <span className="title-divider"> ~ </span>
            {insightsUnlocked ? 'The Results' : 'The Quiz'} <span className="welcome-year">2026</span>
          </h1>
        </div>
        <p className="welcome-tagline">
          Since we can't bring Wanda around the world for wine tours, we are
          bringing the world and the wine to Wanda 🍷🍇🧀
        </p>
        <button className="btn-start btn-start--inverse" onClick={onNext}>Let's Go →</button>
      </div>
    </div>
  )
}
