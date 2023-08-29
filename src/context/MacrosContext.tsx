import { createContext } from 'react'
import useMacros from '../hooks/useMacros'
import { Foods } from '../services/getFoods'
import { Macros, QuestionnaireProps } from '../types/types'

export type Goal = 'lose' | 'maintain' | 'gain'
export type Gender = 'male' | 'female'
export type Activity =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'intense'
  | 'veryIntense'

export type MacrosContextProps = {
  foods: Foods
  questionnaire: QuestionnaireProps | null
  macros: Macros | null
  saveQuestionnaire: (questionnaire: QuestionnaireProps) => void
  setFats: (fats: number) => void
  setProteins: (proteins: number) => void
}

export const MacrosContext = createContext({} as MacrosContextProps)

export default function MacrosProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    foods,
    questionnaire,
    macros,
    saveQuestionnaire,
    setFats,
    setProteins,
  } = useMacros()
  return (
    <MacrosContext.Provider
      value={{
        foods,
        questionnaire,
        macros,
        saveQuestionnaire,
        setFats,
        setProteins,
      }}
    >
      {children}
    </MacrosContext.Provider>
  )
}
