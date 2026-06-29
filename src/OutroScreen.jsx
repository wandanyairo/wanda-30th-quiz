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
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })
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
        <h1>Cheers, Wanda! 🥂</h1>
        <p>Your answers have been submitted. See you on July 10!</p>
      </div>
    </div>
  )
}
