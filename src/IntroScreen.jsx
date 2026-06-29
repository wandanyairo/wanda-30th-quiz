export default function IntroScreen({ onStart, onBack }) {
  return (
    <div className="intro">
      <header className="intro-header">
        <h1>
          Wanda's Worldwide Wine Tours™
          <span className="title-divider"> ~ </span>
          The Quiz
        </h1>
        <hr className="intro-divider" />
      </header>

      <ul className="intro-list">
        <li>This quiz is 100% anonymous—no name, no email, nothing tied to you</li>
        <li>
          You will be asked for your city and whether you're celebrating in person
          in NYC or joining from afar—this isn't a roll call, it just helps
          determine correct prize allocation (and to see how worldwide the quiz is!)
        </li>
        <li>
          Every question is required—you won't be able to submit until all are
          answered, so it's quick to power through and you must do it in one
          sitting. There are 10 questions total and it should take around 10 minutes.
        </li>
        <li>You can return to the link anytime to see the questions and your answers</li>
        <li>Deadline: July 8 at 11:59 pm EST</li>
        <li>
          Answers will be revealed on July 10 at the party (for those attending)
          and remotely via a Partiful Card (for those not attending)
        </li>
      </ul>

      <div className="intro-footer">
        <button className="btn-start" onClick={onStart}>Start Quiz</button>
        <button className="btn-back" onClick={onBack}>← Back</button>
      </div>
    </div>
  )
}
