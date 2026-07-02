import { useState } from 'react'

export default function NicknameScreen({ onSubmit, onBack, loading, error }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (value.trim()) onSubmit(value.trim())
  }

  return (
    <div className="intro">
      <header className="intro-header">
        <span className="welcome-year">WWWT · 2026</span>
        <h1>Pick a Nickname</h1>
        <hr className="intro-divider" />
      </header>

      <div className="nickname-body">
        <p className="nickname-desc">
          Your nickname lets you come back to this link anytime to see your answers. It does not identify you — the quiz stays anonymous.
        </p>
        <form className="nickname-form" onSubmit={handleSubmit}>
          <input
            className="nickname-input"
            type="text"
            placeholder="e.g. WineNerd42"
            value={value}
            onChange={e => setValue(e.target.value)}
            maxLength={30}
            autoFocus
          />
          {error && <p className="nickname-error">{error}</p>}
          <button className="btn-start" type="submit" disabled={!value.trim() || loading}>
            {loading ? 'Checking…' : 'Continue →'}
          </button>
        </form>
      </div>

      <div className="intro-footer">
        <button className="btn-back" onClick={onBack}>← Back</button>
      </div>
    </div>
  )
}
