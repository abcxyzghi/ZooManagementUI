import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

const TableCreateMeal = () => {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Create Meal</TableCaption>
          <Thead style={{ color: '#fff' }}>
            <Tr>
              <Th style={{ color: '#fff' }}>Cage Name</Th>
              <Th style={{ color: '#fff' }}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td style={{ cursor: 'pointer' }}>Create Meal</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td style={{ cursor: 'pointer' }}>Create Meal</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td style={{ cursor: 'pointer' }}>Create Meal</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableCreateMeal;
