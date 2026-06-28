import { useState } from 'react'
import IntroScreen from './IntroScreen.jsx'
import QuizScreen from './QuizScreen.jsx'

const QUESTIONS = [
  {
    id: 'city',
    type: 'text',
    text: 'What city are you in?',
  },
  {
    id: 'attendance',
    type: 'choice',
    text: 'Will you be celebrating with us in person in NYC, or joining the fun from afar?',
    options: ['In person', 'Remote'],
  },
]

export default function App() {
  const [screen, setScreen] = useState('intro') // 'intro' | 'quiz' | 'done'
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const total = QUESTIONS.length
  const question = QUESTIONS[currentIndex]
  const currentAnswer = answers[question?.id] ?? ''
  const hasAnswer = currentAnswer.toString().trim() !== ''

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
        <div className="intro-header">
          <h1>Wanda's Worldwide Wine Tours™ — The Quiz</h1>
          <hr className="intro-divider" />
        </div>
        <p className="intro-tagline">All done! More questions coming soon.</p>
      </div>
    )
  }

  return (
    <QuizScreen
      question={question}
      answer={currentAnswer}
      onAnswer={handleAnswer}
      onNext={handleNext}
      currentIndex={currentIndex}
      total={total}
      hasAnswer={hasAnswer}
    />
  )
}
