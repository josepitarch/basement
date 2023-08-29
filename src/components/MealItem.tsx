import { useState } from 'react'
import { Meal } from '../types/types'
import AddOption from './AddOption'

export default function MealItem({ meal }: { meal: Meal }) {
  const [state, setState] = useState(meal)

  const handleMealClick = () => {
    const container = document.getElementById(meal.id)

    const content = container?.querySelector('div')
    content?.classList.toggle('hidden')

    const svg = container?.querySelector('svg')
    svg?.classList.toggle('rotate-90')
  }

  const handleAddOption = () => {
    const newOption = {
      id: window.crypto.randomUUID(),
      name: 'Nueva opción',
      foods: [],
    }

    setState({
      ...state,
      options: [...state.options, newOption],
    })
  }

  return (
    <div
      id={meal.id}
      key={meal.id}
      className='relative px-6 py-2 overflow-hiddentext-white border-2 border-gray-800 rounded-lg select-none w-full'
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
          className='px-1 pt-0 mt-1 text-black sm:text-lg py-7'
        >
          {state.options.map((option) => (
            <li
              key={option.id}
              className='flex items-center justify-between w-full text-gray-700 transition-colors cursor-pointer hover:text-black gap-x-2'
            >
              <h4 className='py-4 pr-2 text-base font-extrabold text-left gap-x-2 sm:text-lg'>
                <span>{option.name}</span>
              </h4>
            </li>
          ))}
        </ul>
        <footer>
          {/* <button onClick={handleAddOption}>Añadir opción</button> */}
          <button
            data-modal-target='staticModal'
            data-modal-toggle='staticModal'
            className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            type='button'
          >
            Toggle modal
          </button>
        </footer>
        <AddOption />
      </div>
    </div>
  )
}
