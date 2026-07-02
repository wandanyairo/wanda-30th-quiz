export default function OutroScreen() {
  return (
    <div className="outro">
      <div className="outro-content">
        <h1 className="outro-thankyou">Thank you for participating 🌍🍷</h1>

        <ul className="outro-list">
          <li>Reminder: this was anonymous</li>
          <li>You can return to this link anytime to see the questions and your answers</li>
          <li>Answers will be revealed on July 10 at the soirée and remotely</li>
        </ul>

        <p className="outro-promo">
          To get into the spirit of the season, check out:{' '}
          <a
            href="https://podcasts.apple.com/us/podcast/encore-wine-crime/id1616682405?i=1000648537961"
            target="_blank"
            rel="noopener noreferrer"
            className="outro-link"
          >
            Wine Crime
          </a>
          {' '}on the Scamfluencers podcast. More wine and crime to come 😈
        </p>

        <p className="outro-sign-off">Cheers!</p>
      </div>
    </div>
  )
}
