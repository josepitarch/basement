import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import Layout from '../layouts/Layout'
import questions from '../questions'
import { useQuestionnaireStore } from '../store/questionnaire'
import { TypeQuestion, type Activity, type Gender, type Goal } from '../types/types'

export default function Questionnaire () {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const { questionnaire, setQuestionnaire } = useQuestionnaireStore()
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
    if (question.type === TypeQuestion.RADIO) {
      const input = document.querySelector('input:checked') as HTMLInputElement
      question.answer = input.value
    } else if (question.type === TypeQuestion.INPUT) {
      const input = document.querySelector('input') as HTMLInputElement
      question.answer = Number(input.value)
    }
    if (currentQuestion === questions.length - 1) {
      setQuestionnaire({
        goal: questions[0].answer as Goal,
        gender: questions[1].answer as Gender,
        age: questions[2].answer as number,
        height: questions[3].answer as number,
        weight: questions[4].answer as number,
        activity: questions[5].answer as Activity
      })

      setLocation('/customize-fats-and-proteins')
    }

    setCurrentQuestion(currentQuestion + 1)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion === 0) return
    setCurrentQuestion(currentQuestion - 1)
  }

  return (
    <Layout title='Qüestionario'>
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
          {question.type === TypeQuestion.RADIO && question.options
            ? (
              <ul className='flex flex-col gap-2'>
                {Object.entries(question.options).map(([key, value]) => (
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
              )
            : (
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
