import { TypeQuestion, type Question } from './types/types'

const questions: Question[] = [
  {
    id: 0,
    title: '¿Cuál es tu objetivo?',
    type: TypeQuestion.RADIO,
    name: 'goal',
    options: {
      lose: 'perder peso',
      mantain: 'mantener peso',
      gain: 'ganar peso'
    }
  },
  {
    id: 1,
    title: '¿Cuál es tu sexo?',
    type: TypeQuestion.RADIO,
    name: 'gender',
    options: {
      male: 'hombre',
      female: 'mujer'
    }
  },
  {
    id: 2,
    title: '¿Cuál es tu edad?',
    type: TypeQuestion.INPUT,
    name: 'age'
  },
  {
    id: 3,
    title: '¿Cuál es tu altura?',
    type: TypeQuestion.INPUT,
    name: 'height'
  },
  {
    id: 4,
    title: '¿Cuál es tu peso?',
    type: TypeQuestion.INPUT,
    name: 'weight'
  },
  {
    id: 5,
    title: '¿Cuál es tu nivel de actividad física?',
    type: TypeQuestion.RADIO,
    name: 'activity',
    options: {
      sedentary: 'sedentario',
      light: 'ligero',
      moderate: 'moderado',
      intense: 'intenso',
      veryIntense: 'muy intenso'
    }
  }
]

export default questions
