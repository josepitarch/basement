import { useLocation } from 'wouter'
import Layout from '../layouts/Layout'
import { useQuestionnaireStore } from '../store/questionnaire'
import { useEffect } from 'react'
import { useCustomizeMacrosStore } from '../store/macros'

const DEFAULT_FATS = 0.9
const DEFAULT_PROTEINS = 2.2

export default function CustomizeMacros () {
  const [, setLocation] = useLocation()
  const { questionnaire } = useQuestionnaireStore()
  const { macrosPerGram: macros, setMacrosPerGram: setMacros } = useCustomizeMacrosStore()

  useEffect(() => {
    if (!questionnaire) {
      setLocation('/questionnaire')
    }
    if (macros) {
      setLocation('/foods')
    }
  }, [questionnaire])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fats = Number(formData.get('fats'))
    const proteins = Number(formData.get('proteins'))
    setMacros({ fatsPerGram: fats, proteinsPerGram: proteins })

    setLocation('/foods')
  }
  return (
    <Layout title='Customiza los macros'>
      <form className='relative w-full max-w-2xl max-h-full' onSubmit={handleSubmit}>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Solo un pasito más...
            </h3>
          </div>
          <div className='p-6 space-y-6'>
            <div className='p-6 space-y-6'>
              <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                Elige cuántos gramos de grasas por cada kilogramo de peso corporal
                deseas incluir en tu dieta. Si no lo tienes claro, puedes dejar el valor
                por defecto. Además te recomendamos que leas el siguiente artículo:
              </p>
              <input
                name='fats'
                type='number'
                className='w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700'
                defaultValue={DEFAULT_FATS}
              />
            </div>
            <div className='p-6 space-y-6'>
              <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
                Elige cuántos gramos de proteínas por cada kilogramo de peso corporal
                deseas incluir en tu dieta. Si no lo tienes claro, puedes dejar el valor
                por defecto. Además te recomendamos que leas el siguiente artículo:
              </p>
              <input
                name='proteins'
                type='number'
                className='w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700'
                defaultValue={DEFAULT_PROTEINS}
              />
            </div>
          </div>

          <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <input
              type='submit'
              value='Calcular'
              className='text-white bg-blue-700focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800'
            />
          </div>
        </div>
      </form>
    </Layout>
  )
}
