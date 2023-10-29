import { useEffect } from 'react'

export default function Layout ({ title = 'The Basement', children }: { title?: string, children: React.ReactNode }) {
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className='max-w-[1200px] m-auto lg:-translate-x-28'>
      <main className='flex justify-center p-6 animate-fade-up text-black'>
        {children}
      </main>
    </div>
  )
}
