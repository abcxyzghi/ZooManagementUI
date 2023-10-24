import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { FOODTYPE } from '../../constants';
import SidebarExpert from '../../Component/SidebarExpert/SidebarExpert';

const DetailMeal = () => {
  return (
    <>
      <div className="wrapper" style={{ height: '100vh' }}>
        <div className="row" style={{ height: '100vh' }}>
          <div className="col-2">
            <SidebarExpert current={'Daily'} />
          </div>
          <div className=" col-10 " style={{ padding: '0 32px' }}>
            <div className="form-group mb-2">
              <label htmlFor="food-type">Food Type:</label>
              <select className="form-control" id="food-type" name="food-type">
                <option value={FOODTYPE.Meal}>{FOODTYPE.Meal}</option>
                <option value={FOODTYPE.Plant}>{FOODTYPE.Plant}</option>
                <option value={FOODTYPE.Medicine}>{FOODTYPE.Medicine}</option>
                {/* Thêm các vai trò khác nếu cần */}
              </select>
            </div>
            <TableContainer>
              <Table variant="simple">
                <Thead style={{ color: '#fff' }}>
                  <Tr>
                    <Th style={{ color: '#fff' }}>Food Name</Th>
                    <Th style={{ color: '#fff' }}>Weight</Th>
                    <Th style={{ color: '#fff' }}>Available</Th>
                    <Th style={{ color: '#fff' }}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>inches</Td>
                    <Td>inches</Td>
                    <Td style={{ cursor: 'pointer' }}>Create Meal</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>inches</Td>
                    <Td>inches</Td>
                    <Td style={{ cursor: 'pointer' }}>Create Meal</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>inches</Td>
                    <Td>inches</Td>
                    <Td style={{ cursor: 'pointer' }}>Create Meal</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Button className="mt-4">Checkout</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMeal;
