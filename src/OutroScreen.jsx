const REVEAL = new Date('2026-07-10T18:00:00Z')
const MAX = 18

export default function OutroScreen({ score = null }) {
  const insightsUnlocked = new Date() >= REVEAL
  return (
    <div className="outro">
      <div className="outro-content">
        {insightsUnlocked && score !== null ? (
          <>
            <h1 className="outro-thankyou">Thanks again for playing!</h1>
            <p className="outro-score">You scored <strong>{score}/{MAX}</strong></p>
            <p className="outro-odds">May the odds be ever in your favour for the prizes 🏆</p>
          </>
        ) : (
          <>
            <h1 className="outro-thankyou">Thank you for participating 🌍🍷</h1>
            <ul className="outro-list">
              <li>Reminder: this was anonymous</li>
              <li>You can return to this link anytime using your nickname to see your answers</li>
              <li>Results will be revealed here on July 10 at 2:00pm EST and winners will be announced at the soirée and remotely</li>
            </ul>
          </>
        )}

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
