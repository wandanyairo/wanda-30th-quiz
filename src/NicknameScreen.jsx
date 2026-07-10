import { useState } from 'react'

export default function NicknameScreen({ onSubmit, onBack, loading, error, insightsUnlocked }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (value.trim()) onSubmit(value.trim())
  }

  return (
    <div className="intro">
      <header className="intro-header">
        <span className="welcome-year">WWWT · 2026</span>
        <h1>{insightsUnlocked ? 'Enter Your Nickname' : 'Pick a Nickname'}</h1>
        <hr className="intro-divider" />
      </header>

      <div className="nickname-body">
        <p className="nickname-desc">
          {insightsUnlocked
            ? 'Make sure you enter your nickname exactly the same. If you forgot your nickname, text me what you think it is so I can deduce from my list and send it to you!'
            : 'Your nickname lets you come back to this link anytime to see your answers and also to see the results once they are revealed. Your nickname also ensures that if you win a prize, it is properly allocated to you! So pick something unique that you will remember.'}
        </p>
        <input
          className="nickname-input"
          type="text"
          placeholder="e.g. WineNerd42"
          value={value}
          onChange={e => setValue(e.target.value)}
          maxLength={30}
        />
        {error && <p className="nickname-error">{error}</p>}
      </div>

      <div className="intro-footer">
        <div className="quiz-nav">
          <button className="btn-start" onClick={handleSubmit} disabled={!value.trim() || loading}>
            {loading ? 'Checking…' : 'Continue →'}
          </button>
          <button className="btn-back" type="button" onClick={onBack}>← Back</button>
        </div>
      </div>
    </div>
  )
}
