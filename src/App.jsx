import { useState } from 'react'
import confetti from 'canvas-confetti'
import { supabase } from './supabase.js'
import WelcomeScreen from './WelcomeScreen.jsx'
import IntroScreen from './IntroScreen.jsx'
import NicknameScreen from './NicknameScreen.jsx'
import QuizScreen from './QuizScreen.jsx'
import OutroScreen from './OutroScreen.jsx'
import { QUESTIONS } from './questions.js'
import { computeScore } from './scoring.js'

export default function App() {
  const [screen, setScreen] = useState('welcome') // 'welcome' | 'intro' | 'nickname' | 'quiz' | 'done' | 'returning'
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [nickname, setNickname] = useState('')
  const [nicknameLoading, setNicknameLoading] = useState(false)
  const [nicknameError, setNicknameError] = useState('')
  const [returningData, setReturningData] = useState(null)
  const [finalScore, setFinalScore] = useState(null)

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

  async function handleNicknameSubmit(nick) {
    setNicknameLoading(true)
    setNicknameError('')
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .ilike('nickname', nick)
      .maybeSingle()

    if (error) {
      setNicknameError('Something went wrong — please try again.')
      setNicknameLoading(false)
      return
    }

    if (data) {
      setReturningData(data)
      setNickname(nick)
      setCurrentIndex(0)
      setScreen('returning')
    } else {
      setNickname(nick)
      setScreen('quiz')
    }
    setNicknameLoading(false)
  }

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

  async function handleNext() {
    if (!hasAnswer) return
    if (currentIndex < total - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setSubmitting(true)
      const { total, breakdown } = computeScore(answers)
      const { error } = await supabase.from('submissions').insert([{
        score:           total,
        score_breakdown: breakdown,
        nickname:        nickname,
        city:           answers['city'],
        attendance:     answers['attendance'],
        favourite_fruit: answers['favourite-fruit'],
        wine_self:      answers['if-you-were-a-wine'],
        rank_glasses:   answers['rank-glasses'],
        rank_wines:     answers['rank-wines'],
        grape_debate:   answers['grape-debate'],
        rank_cheeses:   answers['rank-cheeses'],
        scamfluencer:   answers['scamfluencer'],
        veggie:         answers['veggie'],
        advice:         answers['advice'],
        wishes:         answers['wishes'],
      }])
      if (error) console.error('Supabase insert error:', error)
      setFinalScore(total)
      setTimeout(() => fireConfetti(), 500)
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

  const insightsUnlocked = new Date() >= new Date('2026-07-10T18:00:00Z')
  if (screen === 'welcome') return <WelcomeScreen onNext={() => insightsUnlocked ? setScreen('nickname') : setScreen('intro')} insightsUnlocked={insightsUnlocked} />
  if (screen === 'intro') return <IntroScreen onStart={() => setScreen('nickname')} onBack={() => setScreen('welcome')} />
  if (screen === 'nickname') return <NicknameScreen onSubmit={handleNicknameSubmit} onBack={() => insightsUnlocked ? setScreen('welcome') : setScreen('intro')} loading={nicknameLoading} error={nicknameError} insightsUnlocked={insightsUnlocked} />
  if (screen === 'returning') {
    const returningAnswers = {
      'city':              returningData.city,
      'attendance':        returningData.attendance,
      'favourite-fruit':   returningData.favourite_fruit,
      'if-you-were-a-wine': returningData.wine_self,
      'rank-glasses':      returningData.rank_glasses,
      'rank-wines':        returningData.rank_wines,
      'grape-debate':      returningData.grape_debate,
      'rank-cheeses':      returningData.rank_cheeses,
      'scamfluencer':      returningData.scamfluencer,
      'veggie':            returningData.veggie,
      'advice':            returningData.advice,
      'wishes':            returningData.wishes,
    }
    return (
      <QuizScreen
        question={question}
        answer={returningAnswers[question?.id] ?? ''}
        onAnswer={() => {}}
        onNext={() => currentIndex < total - 1 ? setCurrentIndex(i => i + 1) : setScreen('done')}
        onBack={() => currentIndex > 0 ? setCurrentIndex(i => i - 1) : setScreen('welcome')}
        currentIndex={currentIndex}
        total={total}
        hasAnswer={true}
        submitting={false}
        readOnly={true}
        score={returningData.score}
        scoreBreakdown={returningData.score_breakdown}
      />
    )
  }
  if (screen === 'done') return <OutroScreen score={returningData?.score ?? finalScore} />

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
