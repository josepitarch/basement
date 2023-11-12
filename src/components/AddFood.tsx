import { Button, Modal, Table } from 'flowbite-react'
import { useState } from 'react'
import { useDietStore } from '../store/diet'
import { useFoodsStore } from '../store/foods'
import { type UUID } from '../types/types'

export default function AddFood ({ optionId }: { optionId: UUID }) {
  const { foods } = useFoodsStore()
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [selectedRow, setSelectedRow] = useState<number>(-1)
  const { addFood } = useDietStore()

  const handleRowClick = (index: number) => {
    setSelectedRow(index)
  }

  return (
    <>
      <Button onClick={() => { setOpenModal('dismissible') }}>
        Añadir alimento
      </Button>
      <Modal
        dismissible
        show={openModal === 'dismissible'}
        onClose={() => {
          setSelectedRow(-1)
          setOpenModal(undefined)
        }}
      >
        <Modal.Header>Alimentos</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <Table>
              <Table.Head>
                <Table.HeadCell>Nombre</Table.HeadCell>
                <Table.HeadCell>Cantidad</Table.HeadCell>
                <Table.HeadCell>Unidad</Table.HeadCell>
                <Table.HeadCell>Kilocalorías</Table.HeadCell>
                <Table.HeadCell>Grasas</Table.HeadCell>
                <Table.HeadCell>Carbohidratos</Table.HeadCell>
                <Table.HeadCell>Proteínas</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y'>
                {foods.map((food, index) => (
                  <Table.Row
                    key={food.id}
                    onClick={() => { handleRowClick(index) }}
                    className={`${selectedRow === index && 'bg-red-200'}`}
                  >
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                      {food.name}
                    </Table.Cell>
                    <Table.Cell>{food.quantity}</Table.Cell>
                    <Table.Cell>{food.unit}</Table.Cell>
                    <Table.Cell>{food.kcal}</Table.Cell>
                    <Table.Cell>{food.fats}</Table.Cell>
                    <Table.Cell>{food.carbs}</Table.Cell>
                    <Table.Cell>{food.proteins}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={selectedRow === -1}
            onClick={() => {
              addFood({ optionId, food: foods[selectedRow] })
              setOpenModal(undefined)
              setSelectedRow(-1)
            }}>
            Añadir alimento
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
