import { create } from 'zustand'
import { getFoods } from '../services/getFoods'
import { type Food } from '../types/types'

interface State {
  foods: Food[]
}

export const useFoodsStore = create<State>((set) => ({
  foods: []
}))

if (useFoodsStore.getState().foods.length === 0) {
  getFoods().then((response) => {
    if (response.error != null) return
    useFoodsStore.setState({ foods: response.data })
  })
}
