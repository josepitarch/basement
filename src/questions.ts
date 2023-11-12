import { TypeQuestion, type Question } from './types/types'

const questions: Question[] = [
  {
    id: 0,
    title: '¿Cuál es tu objetivo?',
    type: TypeQuestion.RADIO,
    name: 'goal',
    options: {
      LOSE_WEIGHT: 'Perder peso',
      MAINTAIN_WEIGHT: 'Mantener peso',
      GAIN_WEIGHT: 'Ganar peso'
    }
  },
  {
    id: 1,
    title: '¿Cuál es tu sexo?',
    type: TypeQuestion.RADIO,
    name: 'gender',
    options: {
      MALE: 'Hombre',
      FEMALE: 'Mujer'
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
      SEDENTARY: 'Sedentario',
      LIGHT: 'Ligero',
      MODERATE: 'Moderado',
      INTENSE: 'Intenso',
      VERY_INTENSE: 'Muy intenso'
    }
  }
]

export default questions
