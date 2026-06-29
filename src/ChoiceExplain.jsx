import { useState } from 'react'

export default function ChoiceExplain({ options, value, onChange }) {
  const choice = value?.choice || ''
  const why = value?.why || ''

  function handleChoice(opt) {
    onChange({ choice: opt, why })
  }

  function handleWhy(e) {
    onChange({ choice, why: e.target.value })
  }

  return (
    <div className="choice-explain">
      <div className="quiz-choices">
        {options.map(opt => (
          <button
            key={opt}
            className={`quiz-choice-btn${choice === opt ? ' selected' : ''}`}
            onClick={() => handleChoice(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {choice && (
        <textarea
          className="quiz-textarea"
          placeholder="Tell us why…"
          value={why}
          onChange={handleWhy}
          rows={4}
          autoFocus
        />
      )}
    </div>
  )
}
