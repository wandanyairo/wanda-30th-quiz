export default function IntroScreen({ onStart, onBack }) {
  return (
    <div className="intro">
      <header className="intro-header">
        <span className="welcome-year">WWWT · 2026</span>
        <h1>Things to Know</h1>
        <hr className="intro-divider" />
      </header>

      <ul className="intro-list">
        <li>This quiz is anonymous</li>
        <li>
          You will be asked for your city and whether you're celebrating remotely or in person at the soirée in NYC—this is solely for prize allocation purposes
        </li>
        <li>
          There are 10 quiz questions total, it should take around 10 minutes to complete and you must finish in one sitting
        </li>
        <li>You will pick a nickname — use it to return to this link anytime to see your answers</li>
        <li><strong>Deadline: July 8 at 11:59 pm EST</strong></li>
        <li>Answers will be revealed on July 10 at the soirée and remotely</li>
      </ul>

      <div className="intro-footer">
        <button className="btn-start" onClick={onStart}>Start Quiz</button>
        <button className="btn-back" onClick={onBack}>← Back</button>
      </div>
    </div>
  )
}
