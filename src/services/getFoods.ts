import { supabase } from '../supabase'

export function getFoods () {
  return supabase.from('foods').select('*')
}
