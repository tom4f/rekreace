import { QRRequest, useGetQRUrl } from 'src/features/booking';

export const QRCode = () => {
  const qRData: QRRequest = {
    accountPrefix: '000000',
    accountNumber: '0124976013',
    bankCode: '0800',
    amount: 10,
    currency: 'CZ',
    date: '2025-04-30',
    vs: 123,
    message: 'testovaci platba',
    size: 10,
  };

  const { data: imageUrl, isSuccess, isError, isLoading } = useGetQRUrl(qRData);

  if (isLoading) return <>loading...</>;
  if (isError) return <>Error</>;
  if (isSuccess) return <img src={imageUrl} alt='QR Code' />;
};
