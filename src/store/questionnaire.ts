import { create } from 'zustand'
import { type Questionnaire } from '../types/types'

interface State {
  questionnaire: Questionnaire | null
  setQuestionnaire: (questionnaire: Questionnaire) => void
}

const KEY_LOCAL_STORAGE = 'questionnaire'

const getQuestionnaireFromLocalStore = (): Questionnaire | null => {
  const questionnaire = localStorage.getItem(KEY_LOCAL_STORAGE)

  if (!questionnaire) return null

  return JSON.parse(questionnaire)
}

const saveQuestionnaireInLocalStorage = (questionnaire: Questionnaire) => {
  if (!questionnaire) return
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(questionnaire))
}

export const useQuestionnaireStore = create<State>((set) => ({
  questionnaire: getQuestionnaireFromLocalStore(),
  setQuestionnaire: (questionnaire) => {
    set({ questionnaire })
    saveQuestionnaireInLocalStorage(questionnaire)
  }
}))
