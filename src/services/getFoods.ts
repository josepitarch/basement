import { supabase } from "../supabase"

export async function getFoods() {
  return await supabase.from('foods').select('*')
}

type FoodsResponse = Awaited<ReturnType<typeof getFoods>>
export type Foods = FoodsResponse['data']
export type Error = FoodsResponse['error']
