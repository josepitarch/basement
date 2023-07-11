import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY)

export default function App () {
  supabase
    .from('foods')
    .select()
    .then(({ data, error }) => {
      console.log({ data, error })
    })

  return (
    <div className='flex justify-center p-6'>
      <div className='max-w-[800px] lg:-translate-x-28'>
        <header>
          <h1 className='text-3xl my-5'>Basement</h1>
          <h2 className='text-2xl'>
            Crea tus propias dietas de manera gratuita. ¿Cuál es tu excusa
            ahora?
          </h2>
        </header>
      </div>
    </div>
  )
}
