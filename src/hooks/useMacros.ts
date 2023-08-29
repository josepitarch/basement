import { useEffect, useReducer, useState } from 'react'
import {
  Macros,
  type MacrosAction,
  type MacrosState,
  type QuestionnaireProps,
} from '../types/types'
import { Foods, getFoods } from '../services/getFoods'

const KEY_LOCAL_STORAGE = 'questionnaire'

export default function useMacros() {
  const [foods, setFoods] = useState<Foods>([])

  useEffect(() => { 
    getFoods().then((response) => {
      if (response.error) return
      setFoods(response.data)
    })
  }, [])
  
  const questionnaire = getQuestionnaireFromLocalStore()
  const macros = calculateMacros(questionnaire)

  const initialState = {
    questionnaire,
    macros,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const saveQuestionnaire = (questionnaire: QuestionnaireProps) => {
    dispatch({ type: 'SET_QUESTIONNAIRE', payload: questionnaire })
  }

  const setFats = (payload: number) => {
    dispatch({ type: 'SET_FATS', payload })
  }

  const setProteins = (payload: number) => {
    dispatch({ type: 'SET_PROTEINS', payload })
  }

  return {
    foods,
    questionnaire: questionnaire,
    macros: state.macros,
    saveQuestionnaire,
    setProteins,
    setFats,
  }
}

const reducer = (state: MacrosState, action: MacrosAction) => {
  const { type, payload } = action

  if (type === 'SET_QUESTIONNAIRE') {
    const questionnaire = payload
    const macros = calculateMacros(questionnaire)

    saveQuestionnaireInLocalStorage(questionnaire)

    return { ...state, questionnaire, macros }
  }

  if (type === 'SET_FATS') {
    const carbohydrates = calculateCarbsQuantity(state.macros!)
    return { ...state, carbohydrates, fats: payload }
  }

  if (type === 'SET_PROTEINS') {
    const carbohydrates = calculateCarbsQuantity(state.macros!)
    return { ...state, carbohydrates, proteins: payload }
  }

  return state
}

const calculateTMB = (questionnaire: QuestionnaireProps) => {
  const activityMultiplicate = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    extraActive: 1.9,
  }

  const aux = activityMultiplicate.extraActive

  if (questionnaire.gender === 'male') {
    return (
      88.362 +
      13.397 * questionnaire.weight +
      4.799 * questionnaire.height -
      5.677 * questionnaire.age * aux
    )
  }

  return (
    447.593 +
    9.247 * questionnaire.weight +
    3.098 * questionnaire.height -
    4.33 * questionnaire.age * aux
  )
}

const calculateCarbsQuantity = (macros: Omit<Macros, 'carbohydrates'>) => {
  const { kilocalories, fats, proteins } = macros
  const kcalOfFats = fats * 9
  const kcalOfProteins = proteins * 4

  return (kilocalories - kcalOfFats - kcalOfProteins) / 4
}

const calculateMacros = (questionnaire: QuestionnaireProps | null) => {
  if (!questionnaire) return null
  const kilocalories = calculateTMB(questionnaire)
  const fats = questionnaire.weight * 0.9
  const proteins = questionnaire.weight * 2.2
  const carbohydrates = calculateCarbsQuantity({ kilocalories, fats, proteins })

  return {
    kilocalories,
    fats,
    carbohydrates,
    proteins,
  }
}

const saveQuestionnaireInLocalStorage = (questionnaire: QuestionnaireProps) => {
  if (!questionnaire) return
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(questionnaire))
}

const getQuestionnaireFromLocalStore = (): QuestionnaireProps | null => {
  const questionnaire = localStorage.getItem(KEY_LOCAL_STORAGE)

  if (!questionnaire) return null

  return JSON.parse(questionnaire)
}
