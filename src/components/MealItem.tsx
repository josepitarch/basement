import { Button } from 'flowbite-react'
import { useDietStore } from '../store/diet'
import { type Meal } from '../types/types'
import OptionItem from './OptionItem'
import AddOption from './AddOption'

export default function MealItem ({ meal }: { meal: Meal }) {
  const { removeMeal } = useDietStore()

  const handleMealClick = () => {
    const container = document.getElementById(meal.id)

    const content = container?.querySelector('div')
    content?.classList.toggle('hidden')

    const svg = container?.querySelector('svg')
    svg?.classList.toggle('rotate-90')
  }

  return (
    <div
      id={meal.id}
      key={meal.id}
      className='relative px-6 py-2 overflow-hidden text-white border-2 border-gray-800 rounded-lg select-none w-full'
    >
      <button
        onClick={handleMealClick}
        className='flex items-center justify-between w-full transition-colors cursor-pointergap-x-2'
      >
        <h4 className='py-4 pr-2 text-base font-extrabold text-left gap-x-2 sm:text-lg'>
          <span>{meal.name}</span>
        </h4>
        <svg
          className='flex-shrink-0 w-4 h-4 transition-all duration-200 ease-out transform rotate-90'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </button>
      <div className='hidden'>
        <ul
          id={`content-${meal.id}`}
          className='px-1 pt-0 mt-1sm:text-lg py-7'
        >
          {meal.options.map((option) => (
            <li
              key={option.id}
              className='flex items-center justify-between w-full transition-colors cursor-pointer gap-x-2'
            >
              <OptionItem option={option} />
            </li>
          ))}
        </ul>
        <footer className='flex flex-row justify-between'>
          <AddOption meal={meal} />
          <Button onClick={() => { removeMeal(meal.id) }}>Eliminar</Button>
        </footer>
      </div>
    </div>
  )
}
