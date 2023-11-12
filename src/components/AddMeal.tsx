import { Button, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useDietStore } from '../store/diet'

export default function AddMeal () {
  const [openModal, setOpenModal] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { addMeal } = useDietStore()

  const onCloseModal = () => {
    setOpenModal(false)
    setHasError(false)
  }

  const handleAddMeal = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const nameMeal = formData.get('name-meal')?.toString()
    if (!nameMeal) {
      setHasError(true)
      return
    }
    addMeal(nameMeal)
    onCloseModal()
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  return (
    <>
      <Button onClick={() => { setOpenModal(true) }}>Añadir comida</Button>
      <Modal show={openModal} size='md' onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form className='flex flex-col' onSubmit={handleAddMeal}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Introduce el nombre de la comida</h3>
            <TextInput
              name="name-meal"
              placeholder="Desañuno"
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
