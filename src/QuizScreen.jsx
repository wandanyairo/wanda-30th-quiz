import RankQuestion from './RankQuestion.jsx'
import CitySearch from './CitySearch.jsx'
import WineSearch from './WineSearch.jsx'
import ChoiceExplain from './ChoiceExplain.jsx'
import ScammerHint from './ScammerHint.jsx'
import { CORRECT_ANSWERS } from './correctAnswers.js'

const REVEAL = new Date('2026-07-10T16:00:00Z')

function Check() {
  return <span className="answer-check">✓</span>
}
function Cross() {
  return <span className="answer-cross">✕</span>
}

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
  scoreBreakdown = null,
}) {
  const isLast = currentIndex === total - 1
  const insightsUnlocked = new Date() >= REVEAL
  const showFeedback = readOnly && insightsUnlocked && scoreBreakdown !== null
  const isScored = question.id in CORRECT_ANSWERS
  const questionScore = scoreBreakdown?.[question.id] ?? null

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
            <>
              <textarea
                className="quiz-textarea"
                value={answer}
                onChange={e => onAnswer(e.target.value)}
                rows={4}
                readOnly={readOnly}
              />
              {showFeedback && isScored && (
                <div className="answer-feedback-text">
                  {questionScore > 0
                    ? <p className="answer-feedback-correct"><Check /> Correct!</p>
                    : <p className="answer-feedback-wrong"><Cross /> Not quite—the answer is green apples (granny smith to be precise)</p>
                  }
                </div>
              )}
            </>
          )}

          {question.type === 'wine-search' && (
            <WineSearch value={answer} onChange={onAnswer} />
          )}

          {question.type === 'choice' && (
            <div className="quiz-choices">
              {question.options.map(option => {
                const isSelected = answer === option
                const correct = CORRECT_ANSWERS[question.id]
                const isCorrectOption = correct === option
                let indicator = null
                if (showFeedback && isScored) {
                  if (isSelected && questionScore > 0) indicator = <Check />
                  else if (isSelected && questionScore === 0) indicator = <Cross />
                  else if (!isSelected && isCorrectOption) indicator = <Check />
                }
                return (
                  <button
                    key={option}
                    className={`quiz-choice-btn${isSelected ? ' selected' : ''}${showFeedback && isScored && !isSelected && isCorrectOption ? ' correct-reveal' : ''}`}
                    onClick={() => !readOnly && onAnswer(option)}
                  >
                    {option}
                    {indicator && <span className="choice-indicator">{indicator}</span>}
                  </button>
                )
              })}
            </div>
          )}

          {question.type === 'choice-explain' && (
            <ChoiceExplain
              options={question.options}
              value={answer || {}}
              onChange={onAnswer}
            />
          )}

          {question.type === 'rank' && (() => {
            const correctOrder = showFeedback && isScored ? CORRECT_ANSWERS[question.id] : null
            return (
              <RankQuestion
                key={question.id}
                options={question.options}
                value={answer || []}
                onChange={onAnswer}
                correctOrder={correctOrder}
              />
            )
          })()}

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
