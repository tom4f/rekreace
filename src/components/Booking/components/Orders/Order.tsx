import styled from '@emotion/styled';

import { Form, PdfOrderDownload, QRCode } from '../';

export const Order = () => {
  return (
    <OrderWrapper>
      <Form />
      <QRCode />
      <PdfOrderDownload />
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  width: 100%;
  max-width: 750px;
  display: 'flex';
  gap: '1rem';
`;
