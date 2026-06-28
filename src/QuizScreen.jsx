export default function QuizScreen({
  question,
  answer,
  onAnswer,
  onNext,
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

        <h2 className="quiz-question">{question.text}</h2>

        {question.type === 'text' && (
          <input
            className="quiz-text-input"
            type="text"
            placeholder="Type your answer…"
            value={answer}
            onChange={e => onAnswer(e.target.value)}
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

        <button
          className="btn-next"
          onClick={onNext}
          disabled={!hasAnswer}
        >
          {isLast ? 'Finish' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
