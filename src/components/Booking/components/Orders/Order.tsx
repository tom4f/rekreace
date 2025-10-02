import styled from '@emotion/styled';
import { lazy, Suspense } from 'react';

import { Form, QRCode } from '../';

// Lazy load the heavy PDF component
const PdfOrderDownload = lazy(() =>
  import('../PdfOrder/PdfOrder').then((module) => ({
    default: module.PdfOrderDownload,
  }))
);

export const Order = () => {
  return (
    <OrderWrapper>
      <Form />
      <Suspense fallback={<div style={{ padding: '1rem' }}>Loading PDF...</div>}>
        <PdfOrderDownload />
      </Suspense>
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
