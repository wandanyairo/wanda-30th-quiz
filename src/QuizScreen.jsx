import RankQuestion from './RankQuestion.jsx'
import CitySearch from './CitySearch.jsx'
import WineSearch from './WineSearch.jsx'
import ChoiceExplain from './ChoiceExplain.jsx'
import ScammerHint from './ScammerHint.jsx'

const REVEAL = new Date('2026-07-10T16:00:00Z')

export default function QuizScreen({
  question,
  answer,
  onAnswer,
  onNext,
  onBack,
  currentIndex,
  total,
  hasAnswer,
  submitting,
  readOnly = false,
  score = null,
}) {
  const isLast = currentIndex === total - 1
  const insightsUnlocked = new Date() >= REVEAL

  return (
    <>
    {submitting && (
      <div className="quiz-submit-overlay">
        <p className="quiz-submit-message">Your answers have been submitted!</p>
      </div>
    )}
    <div className={`quiz${submitting ? ' quiz--submitting' : ''}`}>
      <div className="quiz-progress-bar-track">
        <div
          className="quiz-progress-bar-fill"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      <div className="quiz-inner">
        <p className="quiz-progress-label">
          <span>{currentIndex + 1} of {total}</span>
          <span className="welcome-year">WWWT · 2026</span>
        </p>

        {readOnly && insightsUnlocked && score !== null && (
          <p className="quiz-score-banner">Your score: <strong>{score} / 18</strong></p>
        )}

        <h2 className="quiz-question">
          {question.emoji && <span className="quiz-emoji">{question.emoji} </span>}
          {question.text}
          {question.subtext && (
            <><br /><br />{question.subtext}</>
          )}
        </h2>

        {question.hint === 'scammers' && <ScammerHint />}
        {question.hint && question.hint !== 'scammers' && (
          <p className="quiz-hint">{question.hint}</p>
        )}

        <div className={readOnly ? 'quiz-readonly' : undefined}>
          {question.type === 'city' && (
            <CitySearch value={answer} onChange={onAnswer} />
          )}

          {question.type === 'text' && (
            <textarea
              className="quiz-textarea"
              value={answer}
              onChange={e => onAnswer(e.target.value)}
              rows={4}
              readOnly={readOnly}
            />
          )}

          {question.type === 'wine-search' && (
            <WineSearch value={answer} onChange={onAnswer} />
          )}

          {question.type === 'choice' && (
            <div className="quiz-choices">
              {question.options.map(option => (
                <button
                  key={option}
                  className={`quiz-choice-btn${answer === option ? ' selected' : ''}`}
                  onClick={() => !readOnly && onAnswer(option)}
                >
                  {option}
                  {readOnly && answer === option && <span className="choice-check">✓</span>}
                </button>
              ))}
            </div>
          )}

          {question.type === 'choice-explain' && (
            <ChoiceExplain
              options={question.options}
              value={answer || {}}
              onChange={onAnswer}
            />
          )}

          {question.type === 'rank' && (
            <RankQuestion
              key={question.id}
              options={question.options}
              value={answer || []}
              onChange={onAnswer}
            />
          )}
        </div>

        <div className="quiz-nav">
          <button className="btn-next" onClick={onNext} disabled={!readOnly && !hasAnswer}>
            {readOnly
              ? isLast ? 'Done' : 'Next →'
              : isLast ? 'Submit' : 'Next →'}
          </button>
          <button className="btn-back" onClick={onBack}>
            ← Back
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
