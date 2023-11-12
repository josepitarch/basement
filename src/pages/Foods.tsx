import { useEffect } from 'react'
import { useLocation } from 'wouter'
import MealItem from '../components/MealItem'
import Layout from '../layouts/Layout'
import { useDietStore } from '../store/diet'
import { useCustomizeMacrosStore } from '../store/macros'
import calculateDietMacros from '../utils/utils'
import { useQuestionnaireStore } from '../store/questionnaire'
import AddMeal from '../components/AddMeal'

export default function Foods () {
  const [, setLocation] = useLocation()
  const { questionnaire } = useQuestionnaireStore()
  const { macrosPerGram } = useCustomizeMacrosStore()
  const { diet } = useDietStore()

  useEffect(() => {
    if (!questionnaire) {
      setLocation('/questionnaire')
    }
  }, [questionnaire])

  useEffect(() => {
    if (!macrosPerGram) {
      setLocation('/customize-fats-and-proteins')
    }
  }, [questionnaire])

  if (!questionnaire || !macrosPerGram) return

  const totalMacros = calculateDietMacros({ questionnaire, gramFats: macrosPerGram.fatsPerGram, gramProteins: macrosPerGram.proteinsPerGram })

  const macros = diet.meals.reduce((acc, meal) => {
    meal.options.forEach((option) => {
      option.foods.forEach((food) => {
        acc.kcal += (food.quantity * food.food.kcal) / food.food.quantity
        acc.fats += (food.quantity * food.food.fats) / food.food.quantity
        acc.carbs += (food.quantity * food.food.carbs) / food.food.quantity
        acc.proteins += (food.quantity * food.food.proteins) / food.food.quantity
      })
    })
    return acc
  }, {
    kcal: 0,
    fats: 0,
    carbs: 0,
    proteins: 0
  })

  const headerMacros = [
    {
      name: 'Kilocalorías',
      value: `${macros.kcal.toFixed(0)} / ${totalMacros.kcal.toFixed(0)}`
    },
    {
      name: 'Grasas',
      value: `${macros.fats.toFixed(0)} / ${totalMacros.fats.toFixed(0)}`
    },
    {
      name: 'Carbohidratos',
      value: `${macros.carbs.toFixed(0)} / ${totalMacros.carbs.toFixed(0)}`
    },
    {
      name: 'Proteínas',
      value: `${macros.proteins.toFixed(0)} / ${totalMacros.proteins.toFixed(0)}`
    }
  ]

  return (
    <Layout title='Tu dieta'>
      <div className='flex flex-col w-full gap-6'>
        <h1 className='text-5xl'>Tu dieta</h1>
        <div className='flex flex-row justify-between'>
          <AddMeal />
          <div className='flex flex-row gap-4 self-end'>
            {
              headerMacros.map((headerMacro) => (
                <article className='flex flex-col' key={headerMacro.name}>
                  <span>{headerMacro.name}</span>
                  <span className='self-end'>
                    {headerMacro.value}
                  </span>
                </article>
              ))
            }
          </div>
        </div>

        <div className='text-white relative w-full space-y-3'>
          {diet.meals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
