import { Button, Modal, TextInput } from 'flowbite-react'
import { useDietStore } from '../store/diet'
import { useState } from 'react'
import { type Meal } from '../types/types'

export default function AddOption ({ meal }: { meal: Meal }) {
  const [openModal, setOpenModal] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { addOption } = useDietStore()

  const onCloseModal = () => {
    setOpenModal(false)
    setHasError(false)
  }

  const handleAddOption = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const nameOption = formData.get('name-meal')?.toString()
    if (!nameOption) {
      setHasError(true)
      return
    }

    addOption({ mealId: meal.id, name: nameOption })
    onCloseModal()
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  return (
    <>
      <Button onClick={() => { setOpenModal(true) }}>Añadir opción</Button>
      <Modal show={openModal} size='md' onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form className='flex flex-col' onSubmit={handleAddOption}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Introduce el nombre de la opción</h3>
            <TextInput
              name="name-meal"
              placeholder="Opción 1"
              helperText={
                <span className={`${hasError ? 'visible' : 'invisible'} text-red-500 italic`}>
                  El campo no puede estar vacío
                </span>
              }
            />
            <Button type='submit'>Añadir</Button>
          </form>

        </Modal.Body>
      </Modal>
    </>
  )
}
