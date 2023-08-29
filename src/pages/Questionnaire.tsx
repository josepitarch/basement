import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'wouter'
import Layout from '../layouts/Layout'
import { MacrosContext } from '../context/MacrosContext'
import {
  type Activity,
  type Gender,
  type Goal,
  type QuestionnaireProps,
} from '../types/types'
import CustomizeMacros from '../components/CustomizeMacros'

type Question = {
  id: number
  title: string
  type: 'radio' | 'input'
  name: keyof QuestionnaireProps
  options?: Record<string, string>
  answer?: number | string
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

const DEFAULT_FATS = 0.9
const DEFAULT_PROTEINS = 2.2

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const { questionnaire, saveQuestionnaire } = useContext(MacrosContext)
  const [, setLocation] = useLocation()

  const question = questions[currentQuestion]
  const progress = (currentQuestion / questions.length) * 100

  useEffect(() => {
    if (questionnaire) {
      setLocation('/foods')
    }
    if (currentQuestion > 1 && currentQuestion < 5) {
      const input = document.querySelector('input') as HTMLInputElement
      input.value = questions[currentQuestion].answer as string
    }
  }, [questionnaire, currentQuestion])

  const handleNextQuestion = () => {
    if (question.type === 'radio') {
      const input = document.querySelector('input:checked') as HTMLInputElement
      question.answer = input.value
    } else if (question.type === 'input') {
      const input = document.querySelector('input') as HTMLInputElement
      question.answer = Number(input.value)
    }

    setCurrentQuestion(currentQuestion + 1)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) return
    if (question.type === 'input') {
    }
    setCurrentQuestion(currentQuestion - 1)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fats = Number(formData.get('fats'))
    const proteins = Number(formData.get('proteins'))

    saveQuestionnaire({
      goal: questions[0].answer as Goal,
      gender: questions[1].answer as Gender,
      age: questions[2].answer as number,
      height: questions[3].answer as number,
      weight: questions[4].answer as number,
      activity: questions[5].answer as Activity,
      fats,
      proteins,
    })

    setLocation('/foods')
  }


  if (currentQuestion === questions.length - 1) {
    return (
      <Layout>
        <form
          className='relative w-full max-w-2xl max-h-full'
          onSubmit={handleSubmit}
        >
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Solo un pasito más...
              </h3>
            </div>
            <div className='p-6 space-y-6'>
              <CustomizeMacros
                name='fats'
                macro='grasas'
                defaultValue={DEFAULT_FATS}
              />
              <CustomizeMacros
                name='proteins'
                macro='proteínas'
                defaultValue={DEFAULT_PROTEINS}
              />
            </div>

            <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
              <input
                type='submit'
                value='Calcular'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              />
            </div>
          </div>
        </form>
      </Layout>
    )
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
