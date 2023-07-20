export type Goal = 'lose' | 'maintain' | 'gain'
export type Gender = 'male' | 'female'
export type Activity = 'sedentary' | 'light' | 'moderate' | 'intense' | 'veryIntense'

export type QuestionnaireProps = {
  goal: Goal
  gender: Gender
  age: number
  height: number
  weight: number
  activity: Activity
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