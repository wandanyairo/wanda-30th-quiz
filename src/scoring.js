import { CORRECT_ANSWERS, MAX_SCORE } from './correctAnswers.js'

function scoreFruit(answer) {
  const lower = (answer ?? '').toLowerCase()
  return (lower.includes('apple') || lower.includes('granny smith') || lower.includes('pink lady')) ? 1 : 0
}

function scoreRank(questionId, answer) {
  const correct = CORRECT_ANSWERS[questionId]
  if (!Array.isArray(answer)) return 0
  return answer.reduce((pts, id, i) => pts + (id === correct[i] ? 1 : 0), 0)
}

function scoreVeggie(answer) {
  return answer === CORRECT_ANSWERS['veggie'] ? 1 : 0
}

export function computeScore(answers) {
  const breakdown = {
    'favourite-fruit': scoreFruit(answers['favourite-fruit']),
    'rank-glasses':    scoreRank('rank-glasses', answers['rank-glasses']),
    'rank-wines':      scoreRank('rank-wines', answers['rank-wines']),
    'rank-cheeses':    scoreRank('rank-cheeses', answers['rank-cheeses']),
    'veggie':          scoreVeggie(answers['veggie']),
  }
  const total = Object.values(breakdown).reduce((a, b) => a + b, 0)
  return { total, max: MAX_SCORE, breakdown }
}
