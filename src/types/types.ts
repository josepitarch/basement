import { type Database } from './supabase.js'

export type Goal = 'lose' | 'maintain' | 'gain'
export type Gender = 'male' | 'female'
export type Activity =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'intense'
  | 'veryIntense'

export interface Question {
  id: number
  title: string
  type: TypeQuestion
  name: keyof Questionnaire
  options?: Record<string, string>
  answer?: number | string
}

export enum TypeQuestion {
  RADIO,
  INPUT
}

export interface Questionnaire {
  goal: Goal
  gender: Gender
  age: number
  height: number
  weight: number
  activity: Activity
}

export interface Macros {
  kilocalories: number
  fats: number
  carbohydrates: number
  proteins: number
}

export interface MacrosState {
  questionnaire: Questionnaire | null
  macros: Macros | null
}

export type MacrosAction =
  | { type: 'SET_QUESTIONNAIRE', payload: Questionnaire }
  | { type: 'SET_FATS', payload: number }
  | { type: 'SET_PROTEINS', payload: number }

export interface Diet {
  meals: Meal[]
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export interface Meal {
  id: UUID
  name: string
  options: Option[]
}

export interface Option {
  id: UUID
  name: string
  foods: OptionFood[]
}

export type Food = Database['public']['Tables']['foods']['Row']

export interface OptionFood {
  food: Food
  quantity: number
}
