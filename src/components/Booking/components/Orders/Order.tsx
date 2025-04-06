import styled from '@emotion/styled';

import { Form } from '../Form';
import { QRCode } from './QRCode';

export const Order = () => {
  return (
    <OrderWrapper>
      <Form />
      <QRCode />
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  width: 100%;
  max-width: 750px;
  display: 'flex';
  gap: '1rem';
`;
