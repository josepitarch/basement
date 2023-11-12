import { create } from 'zustand'

interface State {
  macrosPerGram: {
    fatsPerGram: number
    proteinsPerGram: number
  }
  setMacrosPerGram: ({ fatsPerGram, proteinsPerGram }: { fatsPerGram: number, proteinsPerGram: number }) => void
}

const KEY_LOCAL_STORAGE = 'macrosPerGram'

const getMacrosPerGramFromLocalStore = () => {
  const macrosPerGram = localStorage.getItem(KEY_LOCAL_STORAGE)

  if (!macrosPerGram) return null

  return JSON.parse(macrosPerGram)
}

const saveMacrosInLocalStorage = ({ fatsPerGram, proteinsPerGram }: { fatsPerGram: number, proteinsPerGram: number }) => {
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify({ fatsPerGram, proteinsPerGram }))
}

export const useCustomizeMacrosStore = create<State>((set) => ({
  macrosPerGram: getMacrosPerGramFromLocalStore(),
  setMacrosPerGram: ({ fatsPerGram, proteinsPerGram }) => {
    set({ macrosPerGram: { fatsPerGram, proteinsPerGram } })
    saveMacrosInLocalStorage({ fatsPerGram, proteinsPerGram })
  }
}))
