import { EditIcon, MinusIcon } from '@chakra-ui/icons'
import { Tr, Td, IconButton } from '@chakra-ui/react'
import React from 'react'
import type { IIngredientData } from './IngredientInput'

const IngredientValue: React.FC<IIngredientData & {onEdit: () => any, onDelete: (id: string) => any}> = ({ id, carbs, energy, fat, name, amount, onEdit, onDelete }) => {
  return (
    <Tr>
      <Td>{name}</Td>
      <Td isNumeric>{energy}</Td>
      <Td isNumeric>{carbs}</Td>
      <Td isNumeric>{fat}</Td>
      <Td isNumeric>{amount}</Td>
      <Td><IconButton onClick={() => onEdit()} icon={<EditIcon/>} aria-label="Edit" mr={1}/><IconButton onClick={() => onDelete(id)} icon={<MinusIcon/>} aria-label="Delete"/></Td>
    </Tr>
  )
}

export default IngredientValue
