import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { OrdersTable } from 'src/components/Booking/components/Orders';

export const Orders = () => {
  return (
    <OrdersWrapper>
      <OrdersTable />
      <Outlet />
    </OrdersWrapper>
  );
};

const OrdersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  text-align: center;
  color: white;
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
`;
