import { useContext, useEffect } from 'react'
import { useLocation } from 'wouter'
import { AddFoodIcon } from '../components/Icons'
import MealItem from '../components/MealItem'
import { MacrosContext } from '../context/MacrosContext'
import useDiet from '../hooks/useDiet'
import Layout from '../layouts/Layout'

export default function Foods() {
  const [, setLocation] = useLocation()
  const { macros } = useContext(MacrosContext)
  const { diet, addMeal } = useDiet()

  useEffect(() => {
    if (!macros) setLocation('/')
  }, [macros])


  const handleAddMeal = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const meal = formData.get('input-meal') as string
    if (!meal) return

    addMeal({ name: meal })
  }

  return (
    <Layout>
      <div className='flex flex-col w-full gap-6'>
        <h1>Foods</h1>
        <form className='flex flex-row max-w-2xl' onSubmit={handleAddMeal}>
          <label
            htmlFor='input-meal'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Añadir comida
          </label>
          <input
            type='text'
            name='input-meal'
            className='bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />

          <label className='relative w-12'>
            <input
              type='submit'
              name='add-meal'
              className='absolute w-full h-full opacity-0 cursor-pointer z-10'
              aria-label='Añadir comida'
            />
            <AddFoodIcon />
          </label>
        </form>

        <div className='text-white relative w-full space-y-3 lg:space-y-5 lg:w-1/2 lg:pr-4'>
          {diet.meals.map((meal) => (
            <MealItem meal={meal} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
