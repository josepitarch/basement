export type Goal = 'lose' | 'maintain' | 'gain'
export type Gender = 'male' | 'female'
export type Activity =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'intense'
  | 'veryIntense'

export type QuestionnaireProps = {
  goal: Goal
  gender: Gender
  age: number
  height: number
  weight: number
  activity: Activity
  fats: number
  proteins: number
}

export type Macros = {
  kilocalories: number
  fats: number
  carbohydrates: number
  proteins: number
}

export type MacrosState = {
  questionnaire: QuestionnaireProps | null
  macros: Macros | null
}

export type MacrosAction =
  | { type: 'SET_QUESTIONNAIRE'; payload: QuestionnaireProps }
  | { type: 'SET_FATS'; payload: number }
  | { type: 'SET_PROTEINS'; payload: number }

type Diet = {
  meals: Meal[]
}

type Id = `${string}-${string}-${string}-${string}-${string}`

type Meal = {
  id: Id
  name: string
  options: Option[]
}

type Option = {
  id: Id
  name: string
  foods: Food[]
}

type DietAction =
  | { type: 'ADD_MEAL'; payload: { name: string } }
  | { type: 'REMOVE_MEAL'; payload: { id: string } }
  | { type: 'ADD_OPTION'; payload: { meal: Meal; name: string } }
  | { type: 'REMOVE_OPTION'; payload: { meal: Meal; name: string } }
  | { type: 'ADD_FOOD'; payload: { option: Option; food: Food } }
  | { type: 'REMOVE_FOOD'; payload: { option: Option; food: Food } }
