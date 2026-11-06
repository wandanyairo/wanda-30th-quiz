export default function WelcomeScreen({ onNext, insightsUnlocked, quizOpen }) {
  const canProceed = insightsUnlocked || quizOpen
  const label = insightsUnlocked ? 'The Results' : 'The Quiz'
  return (
    <div className="welcome">
      <div className="welcome-content">
        <div className="welcome-header">
          <h1>
            Wanda's Worldwide Wine Tours™
            <span className="title-divider"> ~ </span>
            {label} <span className="welcome-year">2026</span>
          </h1>
        </div>
        <p className="welcome-tagline">
          Since we can't bring Wanda around the world for wine tours, we are
          bringing the world and the wine to Wanda 🍷🍇🧀
        </p>
        {canProceed
          ? <button className="btn-start btn-start--inverse" onClick={onNext}>Let's Go →</button>
          : <p style={{ opacity: 0.5, marginTop: '1rem', fontSize: '0.95rem' }}>Quiz opens at 9:30 AM EST</p>
        }
      </div>
    </div>
  )
}
