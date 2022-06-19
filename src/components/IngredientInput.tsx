import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useCallback, useMemo, useState } from 'react'
import { v4 } from 'uuid'
import IngredientValue from './IngredientValue'

export interface IIngredientData {id: string, name: string, energy: number, carbs: number, fat: number, amount: number}

const IngredientInput: React.FC = () => {
  const [data, setData] = useState<IIngredientData[]>([])
  const handleAddData = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.append('id', v4())
    //                                                                                                                                default data in case something goes wrong:
    const newEntry = Array.from(formData.entries()).reduce((a, [key, value]) => ({ ...a, [key]: isNaN(+value) ? value : +value }), { id: '', name: '', energy: 0, carbs: 0, fat: 0, amount: 0 })
    setData(prev => [...prev, newEntry as unknown as IIngredientData])
    e.currentTarget.reset()
  }, [])

  const calcNutritionData = useCallback(() => {
    const calcData = data.map(x => (Object.entries(x).reduce((acc, [k, v]) => ({ ...acc, [k]: typeof v === 'number' ? (x.amount * v / 100) : v }), { id: '', name: '', energy: 0, carbs: 0, fat: 0, amount: 0 })))
    console.log(calcData.reduce((acc, curr) => ({ fat: curr.fat + acc.fat, amount: curr.amount + acc.amount, carbs: curr.carbs + acc.carbs, energy: curr.energy + acc.energy, id: curr.id, name: curr.name })))
  }, [data])

  const nutritionData = useMemo(() => {
    if (data.length > 0) {
      const calcData = data.map(x => (Object.entries(x).reduce((acc, [k, v]) => ({ ...acc, [k]: typeof v === 'number' ? (x.amount * v / 100) : v }), { id: '', name: '', energy: 0, carbs: 0, fat: 0, amount: 0 })))
      return calcData.reduce((acc, curr) => ({ fat: curr.fat + acc.fat, amount: curr.amount + acc.amount, carbs: curr.carbs + acc.carbs, energy: curr.energy + acc.energy, id: curr.id, name: curr.name }))
    }
  }, [data])
  return (
    <Box>
      <TableContainer>
        <form onSubmit={handleAddData}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Energie (kcal)</Th>
                <Th isNumeric>Kohlehydrate</Th>
                <Th isNumeric>Fett</Th>
                <Th isNumeric>Gramm</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ carbs, energy, fat, name, id, amount }, i) => (
                <IngredientValue key={id} id={id} carbs={carbs} energy={energy} fat={fat} name={name} amount={amount} onDelete={(id) => setData(data.filter(x => x.id !== id))} onEdit={() => {}}/>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>
                  <Input name="name" placeholder="Name"/>
                </Th>
                <Th isNumeric>
                  <Flex maxW="100%" justify="flex-end">
                    <NumberInput name="energy" maxW="100px" defaultValue={0} precision={1} step={0.1} min={0} display="flex" justifyContent="flex-end">
                      <NumberInputField textAlign="right"/>
                      <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                </Th>
                <Th isNumeric align="right">
                  <Flex maxW="100%" justify="flex-end">
                    <NumberInput name="carbs" maxW="100px" defaultValue={0} precision={1} step={0.1} min={0}>
                      <NumberInputField textAlign="right"/>
                      <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                </Th>
                <Th isNumeric align="right">
                  <Flex maxW="100%" justify="flex-end">
                    <NumberInput name="fat" maxW="100px" defaultValue={0} precision={1} step={0.1} min={0}>
                      <NumberInputField textAlign="right"/>
                      <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                </Th>
                <Th isNumeric align="right">
                  <Flex maxW="100%" justify="flex-end">
                    <NumberInput name="amount" maxW="100px" defaultValue={0} precision={1} step={0.1} min={0}>
                      <NumberInputField textAlign="right"/>
                      <NumberInputStepper>
                        <NumberIncrementStepper/>
                        <NumberDecrementStepper/>
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                </Th>
                <Th>
                  <IconButton icon={<AddIcon/>} type="submit" aria-label="Add Values">Add</IconButton>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </form>
      </TableContainer>
      <Heading mt={10}>Summe:</Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>
                Energie
              </Th>
              <Th>
                Kohlehydrate
              </Th>
              <Th>
                Fett
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                {nutritionData?.energy.toFixed(2)}
              </Td>
              <Td>
                {nutritionData?.carbs.toFixed(2)}
              </Td>
              <Td>
                {nutritionData?.fat.toFixed(2)}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default IngredientInput
