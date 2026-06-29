export default function ChoiceExplain({ options, value, onChange }) {
  const choice = value?.choice || ''
  const why = value?.why || ''

  function handleChoice(opt) {
    onChange({ choice: opt, why: choice === opt ? why : '' })
  }

  function handleWhy(e) {
    onChange({ choice, why: e.target.value })
  }

  return (
    <div className="choice-explain">
      {options.map(opt => (
        <div key={opt} className="choice-explain-option">
          <button
            className={`quiz-choice-btn${choice === opt ? ' selected' : ''}`}
            onClick={() => handleChoice(opt)}
          >
            {opt}
          </button>
          {choice === opt && (
            <textarea
              className="quiz-textarea choice-explain-textarea"
              placeholder="Tell us why…"
              value={why}
              onChange={handleWhy}
              rows={4}
              autoFocus
            />
          )}
        </div>
      ))}
    </div>
  )
}
