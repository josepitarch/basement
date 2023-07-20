import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'wouter'
import Layout from '../layouts/Layout'
import { MacrosContext } from '../context/MacrosContext'
import {
  type Activity,
  type Gender,
  type Goal,
  type QuestionnaireProps,
} from '../types'

type Question = {
  id: number
  title: string
  type: 'radio' | 'input'
  name: keyof QuestionnaireProps
  options?: Record<string, string>
  answer?: string
}

const questions: Question[] = [
  {
    id: 0,
    title: '¿Cuál es tu objetivo?',
    type: 'radio',
    name: 'goal',
    options: {
      lose: 'perder peso',
      mantain: 'mantener peso',
      gain: 'ganar peso',
    },
  },
  {
    id: 1,
    title: '¿Cuál es tu sexo?',
    type: 'radio',
    name: 'gender',
    options: {
      male: 'hombre',
      female: 'mujer',
    },
  },
  {
    id: 2,
    title: '¿Cuál es tu edad?',
    type: 'input',
    name: 'age',
  },
  {
    id: 3,
    title: '¿Cuál es tu altura?',
    type: 'input',
    name: 'height',
  },
  {
    id: 4,
    title: '¿Cuál es tu peso?',
    type: 'input',
    name: 'weight',
  },
  {
    id: 5,
    title: '¿Cuál es tu nivel de actividad física?',
    type: 'radio',
    name: 'activity',
    options: {
      sedentary: 'sedentario',
      light: 'ligero',
      moderate: 'moderado',
      intense: 'intenso',
      veryIntense: 'muy intenso',
    },
  },
]

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const answers = useRef<QuestionnaireProps>({
    goal: 'maintain',
    gender: 'male',
    age: 0,
    height: 0,
    weight: 0,
    activity: 'sedentary',
  })
  const { questionnaire, saveQuestionnaire } = useContext(MacrosContext)
  const [, setLocation] = useLocation()
  
  useEffect(() => {
    if (questionnaire) {
      setLocation('/foods')
    }
  }, [questionnaire])

  const question = questions[currentQuestion]
  const progress = (currentQuestion / questions.length) * 100

  const handleNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      saveQuestionnaire(answers.current)
      setLocation('/foods')
    }

    setCurrentQuestion(currentQuestion + 1)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) return
    if (question.type === 'input') {
    }
    setCurrentQuestion(currentQuestion - 1)
  }

  const setQuestion = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'goal') {
      answers.current.goal = value as Goal
    } else if (name === 'sex') {
      answers.current.gender = value as Gender
    } else if (name === 'age') {
      answers.current.age = Number(value)
    } else if (name === 'height') {
      answers.current.height = Number(value)
    } else if (name === 'weight') {
      answers.current.weight = Number(value)
    } else if (name === 'activity') {
      answers.current.activity = value as Activity
    }
  }

  return (
    <Layout>
      <section className='flex flex-col gap-6'>
        <h4 className='text-5xl'>Completa el formulario</h4>
        <p>
          Para poder darte una referencia de como has de distrubir y construir
          tu dieta necesitamos conocer estos datos acerca de ti
        </p>
        <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white animate-fade-down'>
            {question.title}
          </h5>
          {question.type === 'radio' ? (
            <ul className='flex flex-col gap-2'>
              {Object.entries(question.options!).map(([key, value]) => (
                <div key={key}>
                  <input
                    id={key}
                    type='radio'
                    name={question.name}
                    value={key}
                    defaultChecked={question.answer === key}
                    onChange={setQuestion}
                  />
                  <label htmlFor={key} className='capitalize'>
                    {value}
                  </label>
                </div>
              ))}
            </ul>
          ) : (
            <input
              type='number'
              className='w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700'
              name={question.name}
              defaultValue={question?.answer ?? 0}
              onChange={setQuestion}
            />
          )}

          <footer>
            <div className='w-full mt-5 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700'>
              <div
                className='bg-blue-600 h-2.5 rounded-full dark:bg-blue-500'
                style={{ width: `${progress}%` }}
              />
            </div>
            <button
              disabled={currentQuestion === 0}
              onClick={handlePreviousQuestion}
            >
              Atrás
            </button>
            <button onClick={handleNextQuestion}>
              {currentQuestion === questions.length - 1
                ? 'Finalizar'
                : 'Siguiente'}
            </button>
          </footer>
        </div>
      </section>
    </Layout>
  )
}
