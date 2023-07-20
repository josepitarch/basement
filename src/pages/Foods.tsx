import { useContext, useEffect } from 'react'
import Layout from '../layouts/Layout'
import CustomizeMacros from '../components/CustomizeMacros'
import { MacrosContext } from '../context/MacrosContext'
import { useLocation } from 'wouter'

const DEFAULT_FATS = 0.9
const DEFAULT_PROTEINS = 2.2

export default function Foods() {
  const [, setLocation] = useLocation()
  const { macros, setFats, setProteins } = useContext(MacrosContext)

  useEffect(() => { 
    if (!macros) setLocation('/')
  }, [macros])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fats = Number(formData.get('fats'))
    const proteins = Number(formData.get('proteins'))
    setFats(fats)
    setProteins(proteins)
  }

  return (
    <Layout>
      <form className='relative w-full max-w-2xl max-h-full' onSubmit={handleSubmit}>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Solo un pasito más...
            </h3>
          </div>
          <div className='p-6 space-y-6'>
            <CustomizeMacros name='fats' macro='grasas' defaultValue={DEFAULT_FATS} />
            <CustomizeMacros name='proteins' macro='proteínas' defaultValue={DEFAULT_PROTEINS} />
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
