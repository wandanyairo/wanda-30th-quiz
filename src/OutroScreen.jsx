import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

export default function OutroScreen() {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    const duration = 3000
    const end = Date.now() + duration
    const colors = ['#D4763B', '#8b2e2e', '#f5c97a', '#FBF6EE', '#c94f7c']

    ;(function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors })
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }, [])

  return (
    <div className="outro">
      <div className="outro-image-placeholder">
        {/* Replace with <img> when you have the image ready */}
        <span className="welcome-image-emoji">🥂</span>
      </div>

      <div className="outro-text">
        <p className="outro-submitted">Your answers have been submitted!</p>
        <h1 className="outro-thankyou">Thank you for participating and for repping your city 🌍</h1>

        <ul className="outro-list">
          <li>Reminder: this was fully anonymous. Nothing here was tied to your name</li>
          <li>You can return to this link anytime to see the questions and your answers</li>
          <li>
            Answers will be revealed on July 10 at the party (for those attending)
            and remotely via a Partiful Card (for those not attending)
          </li>
        </ul>

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

        <p className="outro-sign-off">Happy Wanda's Worldwide Wine Tours™!</p>
      </div>
    </div>
  )
}
