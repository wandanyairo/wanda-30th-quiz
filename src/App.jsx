import { useState } from 'react'
import confetti from 'canvas-confetti'
import WelcomeScreen from './WelcomeScreen.jsx'
import IntroScreen from './IntroScreen.jsx'
import QuizScreen from './QuizScreen.jsx'
import OutroScreen from './OutroScreen.jsx'
import { QUESTIONS } from './questions.js'

export default function App() {
  const [screen, setScreen] = useState('welcome') // 'welcome' | 'intro' | 'quiz' | 'done'
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const total = QUESTIONS.length
  const question = QUESTIONS[currentIndex]
  const currentAnswer = answers[question?.id] ?? ''

  const hasAnswer = (() => {
    if (Array.isArray(currentAnswer)) return currentAnswer.length > 0
    if (currentAnswer && typeof currentAnswer === 'object') {
      if (question?.type === 'choice-explain') {
        return !!currentAnswer.choice?.trim() && !!currentAnswer.why?.trim()
      }
      if (question?.type === 'wine-search') {
        return !!currentAnswer.wine?.trim() && !!currentAnswer.why?.trim()
      }
    }
    return currentAnswer.toString().trim() !== ''
  })()

  function handleAnswer(value) {
    setAnswers(prev => ({ ...prev, [question.id]: value }))
  }

  function fireConfetti() {
    const colors = ['#d95c88', '#7a2050', '#f5c97a', '#FBF2F5', '#c94f9c']
    const end = Date.now() + 2500
    ;(function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors })
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }

  function handleNext() {
    if (!hasAnswer) return
    if (currentIndex < total - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setSubmitting(true)
      fireConfetti()
      setTimeout(() => setScreen('done'), 2500)
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1)
    } else {
      setScreen('intro')
    }
  }

  if (screen === 'welcome') return <WelcomeScreen onNext={() => setScreen('intro')} />
  if (screen === 'intro') return <IntroScreen onStart={() => setScreen('quiz')} onBack={() => setScreen('welcome')} />
  if (screen === 'done') return <OutroScreen />

  return (
    <QuizScreen
      question={question}
      answer={currentAnswer}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onBack={handleBack}
      currentIndex={currentIndex}
      total={total}
      hasAnswer={hasAnswer}
      submitting={submitting}
    />
  )
}
