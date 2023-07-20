import { createContext } from 'react'
import useMacros from '../hooks/useMacros'
import { Macros, QuestionnaireProps } from '../types'

export type Goal = 'lose' | 'maintain' | 'gain'
export type Gender = 'male' | 'female'
export type Activity = 'sedentary' | 'light' | 'moderate' | 'intense' | 'veryIntense'



export type MacrosContextProps = {
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
  const { questionnaire, macros, saveQuestionnaire, setFats, setProteins } = useMacros()
  return (
    <MacrosContext.Provider
      value={{
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
