import RankQuestion from './RankQuestion.jsx'
import CitySearch from './CitySearch.jsx'

export default function QuizScreen({
  question,
  answer,
  onAnswer,
  onNext,
  onBack,
  currentIndex,
  total,
  hasAnswer,
}) {
  const isLast = currentIndex === total - 1

  return (
    <div className="quiz">
      <div className="quiz-progress-bar-track">
        <div
          className="quiz-progress-bar-fill"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      <div className="quiz-inner">
        <p className="quiz-progress-label">{currentIndex + 1} of {total}</p>

        <h2 className="quiz-question">
          {question.emoji && <span className="quiz-emoji">{question.emoji} </span>}
          {question.text}
        </h2>

        {question.hint && (
          <p className="quiz-hint">{question.hint}</p>
        )}

        {question.type === 'city' && (
          <CitySearch value={answer} onChange={onAnswer} />
        )}

        {question.type === 'text' && (
          <textarea
            className="quiz-textarea"
            placeholder="Type your answer…"
            value={answer}
            onChange={e => onAnswer(e.target.value)}
            rows={4}
            autoFocus
          />
        )}

        {question.type === 'choice' && (
          <div className="quiz-choices">
            {question.options.map(option => (
              <button
                key={option}
                className={`quiz-choice-btn${answer === option ? ' selected' : ''}`}
                onClick={() => onAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {question.type === 'rank' && (
          <RankQuestion
            key={question.id}
            options={question.options}
            value={answer || []}
            onChange={onAnswer}
          />
        )}

        <div className="quiz-nav">
          {currentIndex > 0 && (
            <button className="btn-back" onClick={onBack}>← Back</button>
          )}
          <button
            className="btn-next"
            onClick={onNext}
            disabled={!hasAnswer}
          >
            {isLast ? 'Finish' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
