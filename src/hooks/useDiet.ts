import { useReducer } from 'react'
import { Foods } from '../services/getFoods'
import { Diet, DietAction, Meal, Option } from '../types/types'

const LOCAL_STORAGE_KEY = 'diet'

export default function useDiet() {
  const initialDiet = getDietFromLocalStorage()
  const [diet, dispatch] = useReducer(reducer, initialDiet)

  const addMeal = ({ name }: { name: string }) => {
    dispatch({ type: 'ADD_MEAL', payload: { name } })
  }

  const removeMeal = ({ id }: { id: string }) => {
    dispatch({ type: 'REMOVE_MEAL', payload: { id } })
  }

  const addOption = (payload: { meal: Meal; name: string }) => {
    dispatch({ type: 'ADD_OPTION', payload })
  }

  const removeOption = (payload: { meal: Meal; name: string }) => {
    dispatch({ type: 'REMOVE_OPTION', payload })
  }

  const addFood = (payload: { option: Option; food: Foods }) => {
    dispatch({ type: 'ADD_FOOD', payload })
  }

  const removeFood = (payload: { option: Option; food: Foods }) => {
    dispatch({ type: 'REMOVE_FOOD', payload })
  }

  return {
    diet,
    addMeal,
    removeMeal,
    addOption,
    removeOption,
    addFood,
    removeFood,
  }
}

const reducer = (diet: Diet, action: DietAction) => {
  const { type, payload } = action

  if (type === 'ADD_MEAL') {
    const meal = {
      id: window.crypto.randomUUID(),
      name: payload.name,
      options: [],
    }

    const meals = [...diet.meals, meal]
    const newDiet = { ...diet, meals }

    saveDietInLocalStorage(newDiet)

    return newDiet
  }

  if (type === 'REMOVE_MEAL') {
    const meals = diet.meals.filter((meal) => meal.id !== payload.id)

    const newDiet = { ...diet, meals }
    saveDietInLocalStorage(newDiet)

    return newDiet
  }

  if (type === 'ADD_OPTION') {
    const newDiet = structuredClone(diet)

    const meal = newDiet.meals.find((meal) => meal.id === payload.meal.id)
    if (!meal) return newDiet

    const option = {
      id: window.crypto.randomUUID(),
      name: payload.name,
      foods: [],
    }

    const options = [...meal.options, option]
    const newMeal = { ...meal, options }

    const mealIndex = newDiet.meals.findIndex(
      (meal) => meal.id === payload.meal.id,
    )
    newDiet.meals[mealIndex] = newMeal

    saveDietInLocalStorage(newDiet)

    return newDiet
  }

  if (type === 'REMOVE_OPTION') {
    const newDiet = structuredClone(diet)

    const meal = newDiet.meals.find((meal) => meal.id === payload.meal.id)
    if (!meal) return newDiet

    const options = meal.options.filter((option) => option.id !== payload.id)
    const newMeal = { ...meal, options }

    const mealIndex = newDiet.meals.findIndex(
      (meal) => meal.id === payload.meal.id,
    )
    newDiet.meals[mealIndex] = newMeal

    saveDietInLocalStorage(newDiet)

    return newDiet
  }

  if (type === 'ADD_FOOD') {
    const newDiet = structuredClone(diet)

    const meal = newDiet.meals.find((meal) => meal.id === payload.meal.id)
    if (!meal) return newDiet

    const option = meal.options.find((o) => o.id === payload.option.id)
    if (!option) return newDiet

    const optionWithFood = [...option.foods, payload.food]
    const newOption = { ...option, option: optionWithFood }

    const optionIndex = meal.options.findIndex(
      (o) => o.id === payload.option.id,
    )
    meal.options[optionIndex] = newOption

    saveDietInLocalStorage(newDiet)

    return newDiet
  }

  if (type === 'REMOVE_FOOD') {
    const newDiet = structuredClone(diet)

    const meal = newDiet.meals.find((meal) => meal.id === payload.meal.id)
    if (!meal) return newDiet

    const option = meal.options.find((o) => o.id === payload.option.id)
    if (!option) return newDiet

    const optionWithoutFood = option.foods.filter((food) => {
      if (!food) return false
      return food.id !== payload.food.id
    })

    const newOption = { ...option, option: optionWithoutFood }

    const optionIndex = meal.options.findIndex(
      (o) => o.id === payload.option.id,
    )
    meal.options[optionIndex] = newOption

    saveDietInLocalStorage(newDiet)

    return newDiet
  }

  return diet
}

const saveDietInLocalStorage = (diet: Diet) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(diet))
}

const getDietFromLocalStorage = (): Diet => {
  const diet = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!diet) return { meals: [] }

  return JSON.parse(diet)
}
