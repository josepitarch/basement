type Props = {
  name: string
  macro: string
  defaultValue: number
}

export default function CustomizeMacros({ name, macro, defaultValue }: Props) {
  return (
    <div className='p-6 space-y-6'>
      <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
        Elige cuántos gramos de {macro} por cada kilogramo de peso corporal
        deseas incluir en tu dieta. Si no lo tienes claro, puedes dejar el valor
        por defecto. Además te recomendamos que leas el siguiente artículo:
      </p>
      <input
        name={name}
        type='number'
        className='w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700'
        defaultValue={defaultValue}
      />
    </div>
  )
}
