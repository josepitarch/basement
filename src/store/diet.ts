import { create } from 'zustand'
import { type Diet, type UUID, type Food } from '../types/types'

interface State {
  diet: Diet
  addMeal: (name: string) => void
  removeMeal: (id: UUID) => void
  addOption: ({ mealId, name }: { mealId: UUID, name: string }) => void
  removeOption: (id: UUID) => void
  addFood: ({ optionId, food }: { optionId: UUID, food: Food }) => void
  removeFood: ({ optionId, foodId }: { optionId: UUID, foodId: number }) => void
  addQuantity: ({ optionId, foodId, quantity }: { optionId: UUID, foodId: number, quantity: number }) => void
  removeQuantity: ({ optionId, foodId, quantity }: { optionId: UUID, foodId: number, quantity: number }) => void
}

const saveDietInLocalStorage = (diet: Diet) => {
  localStorage.setItem('diet', JSON.stringify(diet))
}

const getDietFromLocalStorage = () => {
  const diet = localStorage.getItem('diet')

  if (!diet) return

  return JSON.parse(diet)
}

export const useDietStore = create<State>((set) => {
  const diet = getDietFromLocalStorage()
  const meals = diet?.meals || []

  return ({
    diet: {
      meals
    },
    addMeal: (name) => {
      set((state) => {
        const meal = {
          id: window.crypto.randomUUID(),
          name,
          options: []
        }

        const diet = { ...state.diet, meals: [...state.diet.meals, meal] }

        saveDietInLocalStorage(diet)

        return { diet }
      })
    },
    removeMeal: (id) => {
      set((state) => {
        const meals = state.diet.meals.filter((meal) => meal.id !== id)

        const diet = { ...state.diet, meals }

        saveDietInLocalStorage(diet)

        return { diet }
      })
    },
    addOption: ({ mealId, name }) => {
      set((state) => {
        const option = {
          id: window.crypto.randomUUID(),
          name,
          foods: []
        }

        const meals = state.diet.meals.map((meal) => {
          if (meal.id === mealId) {
            return { ...meal, options: [...meal.options, option] }
          }

          return meal
        })

        const diet = { ...state.diet, meals }

        saveDietInLocalStorage(diet)

        return { diet }
      })
    },
    removeOption: (id) => {
      set((state) => {
        const meals = state.diet.meals.map((meal) => {
          const options = meal.options.filter((option) => option.id !== id)

          return { ...meal, options }
        })

        const diet = { ...state.diet, meals }

        saveDietInLocalStorage(diet)

        return { diet }
      })
    },
    addFood: ({ optionId, food }) => {
      set((state) => {
        const meals = state.diet.meals.map((meal) => {
          const options = meal.options.map((option) => {
            if (option.id === optionId) {
              const optionFood = {
                food,
                quantity: food.quantity
              }

              return { ...option, foods: [...option.foods, optionFood] }
            }

            return option
          })

          return { ...meal, options }
        })

        const diet = { ...state.diet, meals }

        saveDietInLocalStorage(diet)

        return { diet }
      })
    },
    removeFood: ({ optionId, foodId }) => {
      set((state) => {
        const meals = state.diet.meals.map((meal) => {
          const options = meal.options.map((option) => {
            if (option.id === optionId) {
              const foods = option.foods.filter((optionFood) => optionFood.food.id !== foodId)

              return { ...option, foods }
            }

            return option
          })

          return { ...meal, options }
        })

        const diet = { ...state.diet, meals }

        saveDietInLocalStorage(diet)

        return { diet }
      })
    },
    addQuantity: ({ optionId, foodId, quantity }) => {
      set((state) => {
        const meals = state.diet.meals.map((meal) => {
          const options = meal.options.map((option) => {
            if (option.id === optionId) {
              const foods = option.foods.map((optionFood) => {
                if (optionFood.food.id === foodId) {
                  return { ...optionFood, quantity: optionFood.quantity + quantity }
                }

                return optionFood
              })

              return { ...option, foods }
            }

            return option
          })

          return { ...meal, options }
        })

        const diet = { ...state.diet, meals }

        saveDietInLocalStorage(diet)

        return { diet }
      })
    },
    removeQuantity: ({ optionId, foodId, quantity }) => {
      set((state) => {
        const meals = state.diet.meals.map((meal) => {
          const options = meal.options.map((option) => {
            if (option.id === optionId) {
              const foods = option.foods.map((optionFood) => {
                if (optionFood.food.id === foodId) {
                  return { ...optionFood, quantity: optionFood.quantity - quantity }
                }

                return optionFood
              })

              return { ...option, foods }
            }

            return option
          })

          return { ...meal, options }
        })

        const diet = { ...state.diet, meals }

        saveDietInLocalStorage(diet)

        return { diet }
      })
    }
  })
})
