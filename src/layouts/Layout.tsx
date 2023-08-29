export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-[1200px] m-auto lg:-translate-x-28'>
      <main className='flex justify-center p-6 animate-fade-up text-white'>
        {children}
      </main>
    </div>
  )
}
