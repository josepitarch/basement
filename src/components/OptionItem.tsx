import { useDietStore } from '../store/diet'
import { type Option } from '../types/types'
import AddFood from './AddFood'
import { Icons } from './Icons'

export default function OptionItem ({ option }: { option: Option }) {
  const { removeFood, addQuantity, removeQuantity } = useDietStore()

  const handleMealClick = () => {
    const container = document.getElementById(option.id)

    const content = container?.querySelector('div')
    content?.classList.toggle('hidden')

    const svg = container?.querySelector('svg')
    svg?.classList.toggle('rotate-90')
  }

  const macros = option.foods.reduce((acc, food) => {
    acc.kilocalories += (food.quantity * food.food.kilocalories) / food.food.quantity
    acc.fats += (food.quantity * food.food.fats) / food.food.quantity
    acc.carbs += (food.quantity * food.food.carbs) / food.food.quantity
    acc.proteins += (food.quantity * food.food.proteins) / food.food.quantity
    return acc
  }, {
    kilocalories: 0,
    fats: 0,
    carbs: 0,
    proteins: 0
  })

  const capitalizeFoodName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <div
      id={option.id}
      key={option.id}
      className='relative px-6 py-2 overflow-hiddentext-white border-2 border-gray-800 rounded-lg select-none w-full'
    >
      <button
        onClick={handleMealClick}
        className='flex items-center justify-between w-full transition-colors cursor-pointergap-x-2'
      >
        <h4 className='py-4 pr-2 text-base font-extrabold text-left gap-x-2 sm:text-lg'>
          <span>{option.name}</span>
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
        <div className={`flex flex-row gap-2 ${option.foods.length > 0 ? 'visible' : 'invisible'}`}>
          <article className='flex flex-col'>
            <span>Kilocalorías </span>
            <span>
              {macros.kilocalories.toFixed(0)}
            </span>
          </article>
          <article className='flex flex-col'>
            <span>Grasas </span>
            <span>{macros.fats.toFixed(0)}</span>
          </article>
          <article className='flex flex-col'>
            <span>Carbohidratos </span>
            <span>{macros.carbs.toFixed(0)}</span>
          </article>
          <article className='flex flex-col'>
            <span>Proteínas </span>
            <span>{macros.proteins.toFixed(0)}</span>
          </article>
        </div>
        <ul className='my-10'>
          {option.foods?.map((food, index) => (
            <li key={index} className='flex flex-row'>
              <span>{capitalizeFoodName(food.food.name)}</span>
              <button className='w-8' onClick={() => { removeQuantity({ optionId: option.id, foodId: food.food.id, quantity: 1 }) }}><Icons.minus /></button>
              <span>{food.quantity} {food.food.unit}</span>
              <button className='w-6' onClick={() => { addQuantity({ optionId: option.id, foodId: food.food.id, quantity: 1 }) }}><Icons.add /></button>
              <button className='flex flex-row gap-2 items-center' onClick={() => { removeFood({ optionId: option.id, foodId: food.food.id }) }}>
                <span>Eliminar</span>
                <Icons.trash />
              </button>
            </li>
          ))}
        </ul>
        <AddFood optionId={option.id} />
      </div>
    </div>
  )
}
