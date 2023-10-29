import { create } from 'zustand'

interface State {
  macros: {
    fats: number
    proteins: number
  }
  setMacros: ({ fats, proteins }: { fats: number, proteins: number }) => void
}

const KEY_LOCAL_STORAGE = 'macros'

const getMacrosFromLocalStore = () => {
  const macros = localStorage.getItem(KEY_LOCAL_STORAGE)

  if (!macros) return null

  return JSON.parse(macros)
}

const saveMacrosInLocalStorage = ({ fats, proteins }: { fats: number, proteins: number }) => {
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify({ fats, proteins }))
}

export const useCustomizeMacrosStore = create<State>((set) => ({
  macros: getMacrosFromLocalStore(),
  setMacros: ({ fats, proteins }) => {
    set({ macros: { fats, proteins } })
    saveMacrosInLocalStorage({ fats, proteins })
  }
}))
