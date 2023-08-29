import { Button, Modal, Table } from 'flowbite-react'
import { useContext, useState } from 'react'
import { MacrosContext } from '../context/MacrosContext'

export default function AddOption() {
  const { foods } = useContext(MacrosContext)
  const [openModal, setOpenModal] = useState<string | undefined>()
  const props = { openModal, setOpenModal }

  return (
    <>
      <Button onClick={() => props.setOpenModal('dismissible')}>
        Toggle modal
      </Button>
      <Modal
        dismissible
        show={props.openModal === 'dismissible'}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <Table striped>
              <Table.Head>
                <Table.HeadCell>Nombre</Table.HeadCell>
                <Table.HeadCell>Cantidad</Table.HeadCell>
                <Table.HeadCell>Unidad</Table.HeadCell>
                <Table.HeadCell>Kilocalorías</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y'>
                {foods!.map((food) => (
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                      {food.name}
                    </Table.Cell>
                    <Table.Cell>{food.quantity}</Table.Cell>
                    <Table.Cell>{food.unit}</Table.Cell>
                    <Table.Cell>{food.kilocalories}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>
            I accept
          </Button>
          <Button color='gray' onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
