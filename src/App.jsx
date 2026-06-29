import { useState } from 'react'
import IntroScreen from './IntroScreen.jsx'
import QuizScreen from './QuizScreen.jsx'
import { QUESTIONS } from './questions.js'

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const total = QUESTIONS.length
  const question = QUESTIONS[currentIndex]

  const currentAnswer = answers[question?.id] ?? ''
  const hasAnswer = Array.isArray(currentAnswer)
    ? currentAnswer.length > 0
    : currentAnswer.toString().trim() !== ''

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex(i => i - 1)
  }

  function handleStart() {
    setScreen('quiz')
  }

  function handleAnswer(value) {
    setAnswers(prev => ({ ...prev, [question.id]: value }))
  }

  function handleNext() {
    if (!hasAnswer) return
    if (currentIndex < total - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setScreen('done')
    }
  }

  if (screen === 'intro') {
    return <IntroScreen onStart={handleStart} />
  }

  if (screen === 'done') {
    return (
      <div className="intro">
        <header className="intro-header">
          <h1>Wanda's Worldwide Wine Tours™ — The Quiz</h1>
          <hr className="intro-divider" />
        </header>
        <p className="intro-tagline" style={{ textAlign: 'center' }}>
          🥂 All done! Your answers have been submitted. See you on July 10!
        </p>
      </div>
    )
  }

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
    />
  )
}
