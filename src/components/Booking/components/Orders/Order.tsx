import styled from '@emotion/styled';

import { Form, PdfOrderDownload, QRCode } from '../';

export const Order = () => {
  return (
    <OrderWrapper>
      <Form />
      <PdfOrderDownload />
      <QRCode />
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  width: 100%;
  max-width: 850px;
  display: 'flex';
  gap: '1rem';
`;
