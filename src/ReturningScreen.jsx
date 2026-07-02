import { QUESTIONS } from './questions.js'

const REVEAL = new Date('2026-07-10T16:00:00Z') // July 10 12pm EDT

function getOptionLabel(question, id) {
  return question.options?.find(o => o.id === id)?.label ?? id
}

function formatAnswer(question, answer) {
  if (answer === null || answer === undefined || answer === '') return <span className="returning-empty">—</span>

  switch (question.type) {
    case 'rank':
      return (
        <ol className="returning-rank">
          {(answer).map(id => (
            <li key={id}>{getOptionLabel(question, id)}</li>
          ))}
        </ol>
      )
    case 'choice-explain':
      return (
        <div className="returning-multi">
          <p><strong>{answer.choice}</strong></p>
          <p>{answer.why}</p>
        </div>
      )
    case 'wine-search':
      return (
        <div className="returning-multi">
          <p><strong>{answer.wine}</strong></p>
          <p>{answer.why}</p>
        </div>
      )
    default:
      return <p>{String(answer)}</p>
  }
}

export default function ReturningScreen({ nickname, data }) {
  const insightsUnlocked = new Date() >= REVEAL

  const answerMap = {
    'city':              data.city,
    'attendance':        data.attendance,
    'favourite-fruit':   data.favourite_fruit,
    'if-you-were-a-wine': data.wine_self,
    'rank-glasses':      data.rank_glasses,
    'rank-wines':        data.rank_wines,
    'grape-debate':      data.grape_debate,
    'rank-cheeses':      data.rank_cheeses,
    'scamfluencer':      data.scamfluencer,
    'veggie':            data.veggie,
    'advice':            data.advice,
    'wishes':            data.wishes,
  }

  return (
    <div className="returning">
      <div className="returning-content">
        <header className="returning-header">
          <span className="welcome-year">WWWT · 2026</span>
          <h1 className="returning-title">Welcome back, {nickname}! 🍷</h1>
          <hr className="intro-divider" />
        </header>

        <div className="returning-score-box">
          {insightsUnlocked ? (
            <>
              <p className="returning-score-label">Your score</p>
              <p className="returning-score-value">{data.score} <span className="returning-score-max">/ 18</span></p>
            </>
          ) : (
            <p className="returning-score-locked">🔒 Scores &amp; insights revealed July 10 at 12pm EST</p>
          )}
        </div>

        <div className="returning-answers">
          {QUESTIONS.map(q => (
            <div key={q.id} className="returning-qa">
              <p className="returning-question">
                {q.emoji && <span className="returning-emoji">{q.emoji} </span>}
                {q.text}
              </p>
              <div className="returning-answer">{formatAnswer(q, answerMap[q.id])}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
