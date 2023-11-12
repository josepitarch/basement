import { type Database } from './supabase.js'

export enum Goal {
  LOSE_WEIGHT,
  MAINTAIN_WEIGHT,
  GAIN_WEIGHT
}

export enum Gender {
  MALE,
  FEMALE
}

export enum Activity {
  SEDENTARY = 1.2,
  LIGHT = 1.375,
  MODERATE = 1.55,
  INTENSE = 1.725,
  VERY_INTENSE = 1.9
}

export interface Question {
  id: number
  title: string
  type: TypeQuestion
  name: keyof Questionnaire
  options?: Record<keyof typeof Goal, string> | Record<keyof typeof Gender, string> | Record<keyof typeof Activity, string>
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
  kcal: number
  fats: number
  carbs: number
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
