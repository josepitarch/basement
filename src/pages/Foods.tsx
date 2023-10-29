import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { Icons } from '../components/Icons'
import MealItem from '../components/MealItem'
import Layout from '../layouts/Layout'
import { useDietStore } from '../store/diet'
import { useCustomizeMacrosStore } from '../store/macros'

export default function Foods () {
  const [, setLocation] = useLocation()
  const { macros } = useCustomizeMacrosStore()
  const { diet, addMeal } = useDietStore()

  useEffect(() => {
    if (!macros) {
      setLocation('/customize-fats-and-proteins')
    }
  }, [macros])

  const handleAddMeal = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nameMeal = formData.get('input-meal')?.toString()
    if (!nameMeal) return

    addMeal(nameMeal)
  }

  const macros1 = diet.meals.reduce((acc, meal) => {
    meal.options.forEach((option) => {
      option.foods.forEach((food) => {
        acc.kilocalories += (food.quantity * food.food.kilocalories) / food.food.quantity
        acc.fats += (food.quantity * food.food.fats) / food.food.quantity
        acc.carbs += (food.quantity * food.food.carbs) / food.food.quantity
        acc.proteins += (food.quantity * food.food.proteins) / food.food.quantity
      })
    })
    return acc
  }, {
    kilocalories: 0,
    fats: 0,
    carbs: 0,
    proteins: 0
  })

  return (
    <Layout title='Tu dieta'>
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
            <Icons.add />
          </label>
        </form>

        <div className={`flex flex-row gap-2 ${diet.meals.length > 0 ? 'visible' : 'invisible'}`}>
          <article className='flex flex-col'>
            <span>Kilocalorías </span>
            <span>
              {macros1.kilocalories.toFixed(0)}
            </span>
          </article>
          <article className='flex flex-col'>
            <span>Grasas </span>
            <span>{macros1.fats.toFixed(0)}</span>
          </article>
          <article className='flex flex-col'>
            <span>Carbohidratos </span>
            <span>{macros1.carbs.toFixed(0)}</span>
          </article>
          <article className='flex flex-col'>
            <span>Proteínas </span>
            <span>{macros1.proteins.toFixed(0)}</span>
          </article>
        </div>

        <div className='text-white relative w-full space-y-3 lg:space-y-5 lg:w-1/2 lg:pr-4'>
          {diet.meals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
