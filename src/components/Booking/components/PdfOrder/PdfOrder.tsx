import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Header } from 'components/Atoms';
import { defaultQRData } from 'components/Booking';
import { useGetQRUrl, useOrder } from 'features/booking';
import { orderPrice } from 'src/components/Prices';
import { formatedDate } from 'src/utils';

import { PdfOrderCreator } from './PdfOrderCreator';

export const PdfOrderDownload = () => {
  const orderData = useOrder();

  const { data: qrCodeUrl, isSuccess } = useGetQRUrl({
    ...defaultQRData,
    ...(orderData?.id && { vs: orderData.id }),
    ...(orderData && { amount: orderPrice(orderData).price }),
    ...(orderData && {
      message: `${defaultQRData.message} ${formatedDate(
        new Date(orderData.check_in)
      )}-${formatedDate(new Date(orderData.check_out))}`,
    }),
  });

  if (!orderData || !Object.keys(orderData).length || !isSuccess) return;

  return (
    <>
      <Header>Ubytovací smlouva</Header>
      <PDFViewer width='100%' height='600'>
        <PdfOrderCreator order={orderData} qrCodeUrl={qrCodeUrl} />
      </PDFViewer>

      <PDFDownloadLink
        document={<PdfOrderCreator order={orderData} qrCodeUrl={qrCodeUrl} />}
        fileName='order-summary.pdf'
      >
        {({ loading }) => (loading ? 'Připravuju...' : 'Uložit PDF')}
      </PDFDownloadLink>
    </>
  );
};
